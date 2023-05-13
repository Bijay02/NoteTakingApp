const Notes = require('../models/noteModel');

const noteCtrl ={
    getNotes: async(req, resp)=>{
        try{
            const notes = await Notes.find({user_id: req.user.id})
            resp.json(notes)
        }catch(err){
            return resp.status(500).json({msg: err.message})
        }
    },
    createNote: async(req, resp)=>{
        try{
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newNote.save();
            resp.json({msg:"New note created"})
        } catch(err){
            return resp.status(500).json({msg: err.message})
        }
    },
    deleteNote: async(req, resp)=>{
      try{
            await Notes.findByIdAndDelete(req.params.id)
            resp.json({msg: "Deleted a Note"})
      } catch(err){
        return resp.status(500).json({msg: err.message})
      } 
    },
    updateNote: async(req, resp)=>{
        try{
            const {title,content, date}= req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            resp.json({msg:"Updated a Note"})
        } catch(err){
          return resp.status(500).json({msg: err.message})
        } 
      },
      getNote: async(req, resp)=>{
        try{
            const note = await Notes.findById(req.params.id)
            resp.json(note)
        } catch(err){
          return resp.status(500).json({msg: err.message})
        } 
      }
}

module.exports = noteCtrl;
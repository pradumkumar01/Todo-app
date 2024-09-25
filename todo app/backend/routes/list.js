const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');



//create list

router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const userExist = await User.findById(id);
        if (userExist) {
        const list = new List({ title, body ,user: userExist._id});
        await list.save().then(()=>res.status(200).json({list }));
        userExist.list.push(list._id);
        userExist.save();
        }
    } catch (error) {
        console.log(error);
    }
});

//update list

router.put('/updateTask/:id', async (req, res) => {
 
    try {
      const { title, body } = req.body;
       
        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        list.save().then(()=>res.status(201).json({message: "List updated successfully", list }));
        
    } catch (error) {
        console.log(error);
    }
});


//delete list

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const {id} = req.body;
        const userExist = await User.findByIdAndUpdate(
      id,
          {$pull: {list: req.params.id}});
        if (userExist) {
        await List.findByIdAndDelete(req.params.id).then(()=>res.status(201).json({message: "List deleted successfully"}));
        }
    } catch (error) {
        console.log(error);
    }
});


//get all lists

router.get('/getTasks/:id', async (req, res) => {
  const list = await List.find({user: req.params.id}).sort({createdAt: -1});

  if(list.length !== 0){
  res.status(201).json({list});
  }
  else{
    res.status(422).json({message: "No list found"});
  }
    
}
);



module.exports = router;






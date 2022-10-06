
const PhoneStore = require('../models/phoneStore.model.js');
const PhoneStore2=require('../models/phoneStore.model2.js');
const PhoneStoreOrders = require('../models/phoneStoreOrders.model');
var ary = [];
exports.create = (req, res) => {
    // Validate the request
    console.log(req.body.FirstName);

    // Create a new PhoneStore (using schema)
    const phonestore = new PhoneStore({
        Title: req.body.Title,
        FirstName: req.body.FirstName,
        Surname: req.body.Surname,
        mobile: req.body.mobile,
        Email:req.body.Email,
        AddressLine1:req.body.AddressLine1,
        AddressLine2:req.body.AddressLine2,
        Town:req.body.Town,
        County:req.body.County,
        EIRCODE:req.body.EIRCODE
    });
    ary.push(req.body.FirstName);
    // Save PhoneStore in the database
    phonestore.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the PhoneStore."
        });
    });
};
exports.create2 = (req, res) => {
    // Validate the request
    // Create a new PhoneStore (using schema)
    const phonestore = new PhoneStore2({
        Manufacturer:req.body.Manufacturer,
        Model:req.body.Model,
        Price:req.body.Price
    });
    ary.push(req.body.Model);
    // Save PhoneStore in the database
    phonestore.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the PhoneStore."
        });
    });
};
exports.root= (req,res)=>{
    console.log("done");
    return res.status(200).send({
        message:"root of quote app"
    });
}


exports.findAll = (req, res) => {
    PhoneStore.find()
    .then(phonestores => {
        res.send(phonestores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all PhoneStores."
        });
    });
};
exports.findAll2 = (req, res) => {
    PhoneStore2.find()
    .then(phonestores => {
        res.send(phonestores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all PhoneStores."
        });
    });
};

exports.findOne = (req, res) => {
    PhoneStore.findById(req.params.phonestoreId)
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });            
        }
        res.send(phonestore);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PhoneStore with id " + req.params.phonestoreId
        });
    });
};
exports.orders = (req, res) => {
    const phoneStoreOrders = new PhoneStoreOrders({
        Name:ary.pop(),
        Phone:ary.pop()
    });
    ary.push(req.body.Model);
    // Save PhoneStore in the database
    phoneStoreOrders.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the PhoneStoreOrders."
        });
    });
};
exports.findOne2 = (req, res) => {
    PhoneStore2.findById(req.params.phonestoreId)
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });            
        }
        res.send(phonestore);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PhoneStore with id " + req.params.phonestoreId
        });
    });
};
// Update a PhoneStore identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.phonestore) {
        return res.status(400).send({
            message: "PhoneStore content cannot be empty"
        });
    }

    // Find the PhoneStore and update it with the request body
    PhoneStore.findByIdAndUpdate(req.params.phonestoreId, {
        phonestore: req.body.phonestore
    },
       { new: true })  // "new: true" return updated object
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });
        }
        res.send(phonestore);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Error updating PhoneStore with id " + req.params.phonestoreId
        });
    });
};
exports.update2 = (req, res) => {
    // Validate Request
    if(!req.body.phonestore) {
        return res.status(400).send({
            message: "PhoneStore content cannot be empty"
        });
    }

    // Find the PhoneStore and update it with the request body
    PhoneStore2.findByIdAndUpdate(req.params.phonestoreId, {
        phonestore: req.body.phonestore
    },
       { new: true })  // "new: true" return updated object
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });
        }
        res.send(phonestore);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Error updating PhoneStore with id " + req.params.phonestoreId
        });
    });
};


    exports.delete = (req, res) => {
    PhoneStore.findByIdAndRemove(req.params.phonestoreId)
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });
        }
        res.send({message: "PhoneStore deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete PhoneStore with id " + req.params.phonestoreId
        });
    });
};
exports.delete2 = (req, res) => {
    PhoneStore2.findByIdAndRemove(req.params.phonestoreId)
    .then(phonestore => {
        if(!phonestore) {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });
        }
        res.send({message: "PhoneStore deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "PhoneStore not found with id " + req.params.phonestoreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete PhoneStore with id " + req.params.phonestoreId
        });
    });
};
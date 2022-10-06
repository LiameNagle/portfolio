module.exports = (app) => {
    const phoneStore = require('../controllers/phoneStore.controllers.js');
    
    app.get('/',phoneStore.root);
    // Create a new Quotation
    app.post('/store/coustomer', phoneStore.create);

    // Retrieve all Quotations
    app.get('/store/coustomer', phoneStore.findAll);

    // Retrieve a single Quotation specified by quotationId
    app.get('/store/coustomer/:phonestoreId', phoneStore.findOne);

    // Update a Quotation specified by quotationId
    app.put('/store/coustomer/:phonestoreId', phoneStore.update);

    // Delete a Quotation specified by quotationId
    app.delete('/store/coustomer/:phonestoreId', phoneStore.delete);

    app.post('/store/order', phoneStore.create2);

    // Retrieve all Quotations
    app.get('/store/order', phoneStore.findAll2);

    // Retrieve a single Quotation specified by quotationId
    app.get('/store/order/:phonestoreId', phoneStore.findOne2);

    // Update a Quotation specified by quotationId
    app.put('/store/order/:phonestoreId', phoneStore.update2);

    // Delete a Quotation specified by quotationId
    app.delete('/store/order/:phonestoreId', phoneStore.delete2);

    app.post('/store/order/records',phoneStore.orders);
}


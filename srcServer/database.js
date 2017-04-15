import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/template', function () {
	console.log('mongoose connected')
});


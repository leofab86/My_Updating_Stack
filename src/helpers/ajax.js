import $ from 'jquery'

function generateMethod (type) {
	return (url, options) => {
    if(options && options.body) {
      options.data = options.body
    }
		return new Promise( (success, error) => {
			$.ajax({
				url,
				type,
        ...(options ? options : {}),
				success: function (data, status, xhr) {
					console.log('AJAX LOGGING: ', arguments);
					success(data);
				},
				error: function(e) {
					console.log('AJAX LOGGING: ', arguments);
					error(e);
				}
			})
		})	
	}
}

export const ajax = {
	post: generateMethod('POST'),

	put: generateMethod('PUT'),
	
	get: generateMethod('GET'),

	delete: generateMethod('DELETE'),	
};

export default ajax;


import 'jquery'

function generateMethod (type) {
	return (url, data, headers) => {
		return new Promise( (success, error) => {
			$.ajax({
				url,
				type,
				headers,
				data,
				success: function (data, status, xhr) {
					console.log('AJAX LOGGING: ' + arguments);
					success(data);
				},
				error: function(e) {
					console.log('AJAX LOGGING: ' + arguments);
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


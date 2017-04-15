//JQuery loaded by rails?? or another module?...
const { ajaxLogging } = window.CONFIG;

function generateMethod (type) {
	return (url, data, headers) => {
		return new Promise( (success, error) => {
			$.ajax({
				url,
				type,
				headers,
				data,
				success: function (data, status, xhr) {
					if(ajaxLogging) console.log(arguments);
					success(data);
				},
				error: function(e) {
					if(ajaxLogging) console.log(arguments);
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


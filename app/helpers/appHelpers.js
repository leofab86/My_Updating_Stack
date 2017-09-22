import toastr from 'toastr';


export function toastrMsg (type, msg) {
	if(type !== 'success' && type !== 'error') throw new Error(`Incorrect toastr type '${type}', expecting 'success' or 'error'`);
	toastr.options.positionClass = 'toast-top-center';
	toastr[type](msg)
}

export function errorHandler (errors) {
	console.error(JSON.stringify(errors));
	//if(!errors) throw new Error(`Not reading errors`);
	if (Array.isArray(errors)) { errors.map( value => toastrMsg('error', JSON.stringify(value)) ) }
	else toastrMsg('error', errors)	
}
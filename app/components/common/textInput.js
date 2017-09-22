import React from 'react';
import is from 'prop-types';


class Input extends React.PureComponent{
	static propTypes = {
		name: is.string.isRequired,
		label: is.string,
		onChange: is.func.isRequired,
		placeholder: is.string,
		value: is.oneOfType([is.string, is.number]),
		error: is.string
	}

	render() {
		let wrapperClass = 'form-group';
		if (this.props.error && this.props.error.length > 0) {
			wrapperClass += " " + 'has-error';
		}

		return(
			<div className={wrapperClass}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<div className='field'>
					<input 
						type={this.props.type}
						name={this.props.name}
						className='form-control'
						placeholder={this.props.placeholder}
						ref={this.props.name}
						value={this.props.value}
						onChange={this.props.onChange}
					/>
					<div className='input'>{this.props.error}</div>
				</div>
			</div>
		);
	}
}

export default Input;
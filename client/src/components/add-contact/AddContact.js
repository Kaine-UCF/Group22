import React, {Component} from "react"
import Dropdown from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import "bootstrap/dist/js/bootstrap.bundle"
// Contact name, [Picture]
// Phone number. Email address
// [date added]
class Contact extends Component {
	constructor(props) {
		super(props);

		//TODO(Levi): Make actual database call to load the contacts into the state.contacts list
		this.loadContacts();
		this.state = {
			toDeleteContact: {},
			searchText: '',
			contacts: [{"null":"null"}]
		}
	}
	loadContacts = () => {
		fetch("http://localhost:3000/api/contacts/list")
		.then(res => {
			return res.json()
		}).then( str => {
			this.setState({contacts : str})
		});
	}
	search = (e) => {
		this.setState({searchText: e})
	}
	createNewContact = (c) => {
		//TODO(Levi): Make actual database call to add contact
	//	c.key = this.state.contacts.length + 1;
		fetch("http://localhost:3000/api/contacts/create",
			{
				method: 'POST', // or 'PUT'
				body: JSON.stringify(c), // data can be `string` or {object}!
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then(response => {
		})
			.then( data => {
			})
			.catch (err =>{

		});
		this.setState ({
			contacts: this.state.contacts.concat(c)
		});
				console.log(this.state.contacts)
	}
	editContact = (c) => {
		
		fetch("http://localhost:3000/api/contacts/update"+c._id,
			{
				method: 'POST', // or 'PUT'
				body: JSON.stringify(c), // data can be `string` or {object}!
				headers: {
					'Content-Type': 'application/json'
				}
			})
		this.loadContacts();

		//TODO(Levi) Make database call to edit the contact:
	/*	const index = this.state.contacts.map((e) => { return e.key;}).indexOf(c.key);
		const copy = this.state.contacts.slice();
		copy[index] = c;
		this.setState({contacts:copy})
		console.log(this.state.contacts)*/
	}
	onDelete = (c) => {
		fetch("http://localhost:3000/api/contacts/"+c._id,
			{
				method: 'DELETE', // or 'PUT'
			//	body: JSON.stringify(c), // data can be `string` or {object}!
				headers: {
					'Content-Type': 'application/json'
				}
			})
		this.loadContacts();
	}
	render ()
	{
		return (
			<div>
			<h1> Contacts </h1>
				<SearchBar
					search={this.search}/>
				<NewContact
					createNewContact = {this.createNewContact}/>
				<ContactTable
					contacts = {this.state.contacts}
					searchText = {this.state.searchText}
					onDelete = {this.onDelete}
					editContact = {this.editContact}/>
			</div>
		);
	}
}
class ContactRow extends Component {
	constructor (props){
		super(props)
		this.onDelete = this.onDelete.bind(this);
		this.state = {
			isEdit: false,
			_id:this.props.contact._id,
			fname: this.props.contact.fname,
			lname: this.props.contact.lname,
			phone: this.props.contact.phone,
			email: this.props.contact.email
		}
	}
	onDelete = ()=> {
		this.props.onDelete(this.props.contact);
	}
	onModify = () =>  {
		if(this.state.isEdit)
		{
			let contact = {
				_id: this.state._id,
				fname: this.state.fname,
				lname: this.state.lname,
				phone: this.state.phone,
				email: this.state.email
			}
			this.props.editContact(contact);
		}
		this.setState({isEdit:!this.state.isEdit});
	}
	editData = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}
 	render() {
		let editButton;
		if(!this.state.isEdit)
		{
			editButton =	(
				<Dropdown title = "⚙️" variant = "outline-primary">
					<div className="d-flex flex-column">
						 <Button variant="danger" onClick={this.onDelete} block><span aria-label="police">Delete?</span></Button>
						 <Button variant="warning" onClick={this.onModify} block>Edit</Button>
					</div>
				</Dropdown>
			)
		}
		else
		{
			editButton =
			<Button variant="success" onClick={this.onModify} >Save Changes</Button>
		}

		return (
			<tr>
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="fname"
						type = "text"
						class ="form-control"
						value =	{!this.state.isEdit ?
							this.props.contact.fname :
							this.state.fname}
						onChange = {this.editData}/>
				</td>
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="lname"
						type = "text"
						class ="form-control"
						value =	{!this.state.isEdit ?
							this.props.contact.lname :
							this.state.lname}
						onChange = {this.editData}/>
				</td>
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="phone"
						type = "text"
						class = "form-control"
						value =	{!this.state.isEdit ? this.props.contact.phone : this.state.phone}
						onChange = {this.editData}/>
				</td>
					{/*TODO(Levi): Find out how format as phone number*/}
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="email"
						type = "text"
						class ="form-control"
						value =	{!this.state.isEdit ? this.props.contact.email : this.state.email}
						onChange = {this.editData}/>
				</td>
				<td>
				{editButton}
				</td>
			</tr>
		)
	}
}

class ContactTable extends Component {
	render() {
		// Do some js stuff outside of the return of jsx.
		var rows = [];
		//TODO(Levi): search should not be case sensitive
		// edit this line
		var temp = this.props.contacts;
		temp.sort((a,b) => (a.fname + a.lname) > (b.fname + b.lname) ? 1 : -1)
		this.props.contacts.forEach(
			(contact) => {
				let fullName = contact.fName + " " + contact.lname;
					if(fullName.includes(this.props.searchText) === false) {
						return;
					}
					rows.push(
						<ContactRow
							key = {contact.key}
							contact ={contact}
							onDelete= {this.props.onDelete}
							editContact={this.props.editContact}/>
						)
			}
		)
		return (
			<table className ="table table-hover">
				<thead>
					<tr>
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone">🤠</span>	First Name
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone">🤠</span>	Last Name
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone">📞</span>	Phone
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
							 <span aria-label="phone">📧</span>Email
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
}

class NewContact extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	this.state = {
		fname:"",
		lname: "",
		email:"",
		phone:""
	}
	}
	validate = () => {
		if(this.state.fname.length <= 0)
			return false;
		if(this.state.lname.length <= 0)
			return false;
		if(this.state.email.length <= 0)
			return false;
		if(this.state.phone.length <= 0)
			return false;
		return true;
	}

	handleSubmit = e => {
		e.preventDefault();
		if(this.validate() === false)
			return;
		const newContact = {
			fname: this.state.fname,
			lname: this.state.lname,
			email: this.state.email,
			phone: this.state.phone,
		}
		this.props.createNewContact(newContact);
		this.setState({
			fname:"",
			lname: "",
			email:"",
			phone:""
		})
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {

		return (
			<div className="pl-3">
			<Form  >
				<Form.Row>
					<Form.Group as = {Form.Col} md="4">
						<Form.Label class="font-weight-bold">First name</Form.Label>
						<Form.Control
						type="text"
						name="fname"
						placeholder="John"
						value={this.state.fname}
						onChange={e=> this.handleChange(e)}
						/>
					</Form.Group>
					<Form.Group as = {Form.Col} md="4">
						<Form.Label class="font-weight-bold">Last name</Form.Label>
						<Form.Control
						type="text"
						name="lname"
						placeholder = "Doe"
						onChange={this.handleChange}
						value={this.state.lname}
						/>
					</Form.Group>

					<Form.Group as = {Form.Col} md="6">
						<Form.Label class="font-weight-bold">Email </Form.Label>
						<Form.Control
							type="email"
							placeholder = "@"
							name="email"
							value={this.state.email}
							onChange={e => this.handleChange(e)}
						/>
					</Form.Group>
					<Form.Group as = {Form.Col} md="6">
						<Form.Label class="font-weight-bold">Phone Number </Form.Label>
						<Form.Control
							type="tel"
							placeholder = "#"
							name="phone"
							value={this.state.phone}
							onChange={e => this.handleChange(e)}
						/>
					</Form.Group>
					<button
						type="submit"
						className="btn btn-success btn-sm"
						onClick ={this.handleSubmit}>
						<b><span aria-label="plus">
						Add Contact
						</span></b></button>
				</Form.Row>
			</Form>
			</div>
		)
	}
}
class SearchBar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			searchText:""
		}
	}
	handleChange = e => {
		this.setState({
			searchText: e.target.value
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.search(this.state.searchText)
	}
	preventReload = (e) => {
		e.preventDefault();
	}
	render() {
		return  (
			<Form className="form-inline md-form form-sm mt-0"
				onSubmit= {e => this.preventReload(e)}>
			<Form.Row>
			<Form.Group as = {Form.Col} md="2">
			  <input
					className="form-control form-control-sm ml-3 w-75"
					type= "text"
					placeholder="Search name"
					onChange = {this.handleChange}
			    aria-label="Search"
					autofocus="true"
					/>
				</Form.Group>
				<Form.Group as = {Form.Col} md="3">
				<button
				type="button"
				className="btn"
				onClick={this.handleSubmit}
				><b><span role="img" aria-label="Search">🔍</span></b></button>
				</Form.Group>
				</Form.Row>
			</Form>
		)
	}
}
export default Contact;

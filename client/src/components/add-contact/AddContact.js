import React, {Component} from "react"
import Dropdown from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import "bootstrap/dist/js/bootstrap.bundle"
import ContactLogo from "../../img/contacts.png"
// Contact name, [Picture]
// Phone number. Email address
// [date added]
class Contact extends Component {
	constructor(props) {
		super(props);

		//TODO(Levi): Make actual database call to load the contacts into the state.contacts list
		this.state = {
			toDeleteContact: {},
			searchText: '',
			contacts: [{key:1, name: "Aevi Huchingson", phone:"123123123", email:"test@test.test"}, {key:2, name: "Bevi Huchingson", phone:"123123123", email:"test@test.test"}, {key:3, name: "Cevi Huchingson", phone:"123123123", email:"test@test.test"}]
		}
	}
	search = (e) => {
		this.setState({searchText: e})
	}
	createNewContact = (c) => {
		//TODO(Levi): Make actual database call to add contact
		c.key = this.state.contacts.length + 1;
		this.setState ({
			contacts: this.state.contacts.concat(c)
		});
				console.log(this.state.contacts)
	}
	editContact = (c) => {
				console.log(this.state.contacts)
		//TODO(Levi) Make database call to edit the contact:
		const index = this.state.contacts.map((e) => { return e.key;}).indexOf(c.key);
		const copy = this.state.contacts.slice();
		copy[index] = c;
		this.setState({contacts:copy})
		console.log(this.state.contacts)
	}
	onDelete = (c) => {
		//TODO(Levi): Make actual database call to delete contact
		this.setState({contacts:
			this.state.contacts.filter(
				function(value, index, arr){
					return c !== value;
				})
			});
	}
	render ()
	{
		return (
			<div>
			<img src={ContactLogo} height="50" style={{paddingRight:'1100px'}}/>
			<div>
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
			name: this.props.contact.name,
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
				key:this.props.contact.key,
				name: this.state.name,
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
						name="name"
						type = "text"
						class ="form-control"
						value =	{!this.state.isEdit ? this.props.contact.name : this.state.name}
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
		temp.sort((a,b) => a.name > b.name ? 1 : -1)
		this.props.contacts.forEach(
			(contact) => {
					if(contact.name.includes(this.props.searchText) === false) {
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
						<span aria-label="phone">🤠</span>	Name
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
		firstName:"",
		lastName: "",
		email:"",
		phone:""
	}
	}
	validate = () => {
		if(this.state.firstName.length <= 0)
			return false;
		if(this.state.lastName.length <= 0)
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
			name: this.state.firstName +" "+ this.state.lastName,
			email: this.state.email,
			phone: this.state.phone,
		}
		this.props.createNewContact(newContact);
		this.setState({
			firstName:"",
			lastName: "",
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
						name="firstName"
						placeholder="John"
						value={this.state.firstName}
						onChange={e=> this.handleChange(e)}
						/>
					</Form.Group>
					<Form.Group as = {Form.Col} md="4">
						<Form.Label class="font-weight-bold">Last name</Form.Label>
						<Form.Control
						type="text"
						name="lastName"
						placeholder = "Doe"
						onChange={this.handleChange}
						value={this.state.lastName}
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
						className="btn btn-primary btn-sm"
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

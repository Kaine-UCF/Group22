import React, {Component} from "react"
import Dropdown from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import "bootstrap/dist/js/bootstrap.bundle"
import ContactLogo from "../../img/contacts.png"
import Pokeball from "../../img/pokeball.png"
import PokemonPhone from "../../img/pokemonphone.png"
import PokemonEmail from "../../img/pokemonemail.png"
import AddFriend from "../../img/addfriend.png"
import SettingIcon from "../../img/pokemonsetting.png"
import EditContact from "../../img/edit.png"
import FavContact from "../../img/favorite.png"
import DeleteContact from "../../img/delete.png"
import SearchIcon from "../../img/searchIcon.png"
// Contact name, [Picture]
// Phone number. Email address
// [date added]
const URL = "http://localhost:3000";
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
		let body = {id: localStorage.getItem("userID")};
		fetch(URL+"/api/contacts/list", {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			return res.json()
		}).then( str => {
			console.log("In Load:" + (new Date()).getMilliseconds())
			this.setState({contacts : str})
		});
	}
	search = (e) => {
		this.setState({searchText: e})
	}
	createNewContact = (c) => {
		//TODO(Levi): Make actual database call to add contact
	//	c.key = this.state.contacts.length + 1;
		fetch(URL+"/api/contacts/create",
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
		//		console.log(this.state.contacts)
	}
	editContact = (c) => {
		 console.log(c)

		fetch(URL+"/api/contacts/update/"+c._id,
			{
				method: 'POST', // or 'PUT'
				body: JSON.stringify(c), // data can be `string` or {object}!
				headers: {
					'Content-Type': 'application/json'
				}
			})

		//TODO(Levi) Make database call to edit the contact:
	/*	const index = this.state.contacts.map((e) => { return e.key;}).indexOf(c.key);
		const copy = this.state.contacts.slice();
		copy[index] = c;
		this.setState({contacts:copy})
		console.log(this.state.contacts)*/
	}
	onDelete =(c)=> {
		console.log("Deleting... "+ c._id)
			const t =  fetch(URL+"/api/contacts/"+c._id,
					{
					method: 'DELETE', // or 'PUT'
					//	body: JSON.stringify(c), // data can be `string` or {object}!
					headers: {
						'Content-Type': 'application/json'
					}}).then((e) => {
					})
		return t;
	}
	componentDidMount() {

	}
	render ()
	{

		return (

			<div>
				<i>{localStorage.getItem("userID")}</i>
				<div className="col-xs-6">
					<img src={ContactLogo} className="ContactLogo"/>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-6" className="CenterAlign">
							<SearchBar
									search={this.search}/>
						</div>
					</div>
				</div>
				<div>
					<NewContact
						createNewContact = {this.createNewContact}/>
					<ContactTable
						loadContacts = {this.loadContacts}
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
	//	console.log(this.props.contact)
		this.state = {
			isEdit: false,
			_id:this.props.contact._id,
			isShiny: "false"
		}
	}
	onDelete = () => {
	//	const promise = new Promise()
		this.props.onDelete(this.props.contact)
		.then( resp => this.props.loadContacts())
	}
	onModify = () =>  {
		if(this.state.isEdit)
		{
			const s = this.state;
			for(var prop in s)
			{
				if(Object.prototype.hasOwnProperty.call(s, prop))
				 {
					  this.props.contact[prop] = s[prop];
				 }
			}
			this.props.editContact(this.props.contact);
		}
		this.setState({isEdit:!this.state.isEdit});
	}
	editData = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	makeShiny = () => {
		this.setState({isShiny:"table-warning"})
	}
 	render() {
		let editButton;
		if(!this.state.isEdit)
		{
			editButton =	(
				<Dropdown drop="left" title={<img src={SettingIcon} className="ContactPageSettingIcon"></img>} variant = "outline-primary">
					<div className="d-flex flex-column">
						 <Button variant="primary" onClick={this.onModify} block><img src={EditContact} className="ContactPageSettingOption" style={{marginRight: '5px'}}></img>Edit</Button>
						 <Button variant="warning" onClick ={this.makeShiny} block><img src={FavContact} className="ContactPageSettingOption" style={{marginRight: '5px'}}></img>Make Shiny</Button>
						 <Button variant="danger" onClick={this.onDelete} block><span aria-label="police"><img src={DeleteContact} className="ContactPageSettingOption" style={{marginRight: '5px'}}></img>Delete?</span></Button>
					</div>
				</Dropdown>
			)
		}
		else
		{
			editButton =
			<Button variant="success" onClick={this.onModify}>Save Changes</Button>
		}

		return (
			<tr className={this.state.isShiny || ""}>
				<td>
					<input
						disabled = {!this.state.isEdit || "" }
						name="fname"
						type = "text"
						className ="form-control"
						value =	{
							(!this.state.isEdit)
							? (this.props.contact.fname || "")
							: this.state.fname}
						onChange = {this.editData}/>
				</td>
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="lname"
						type = "text"
						className ="form-control"
						value =	{
							(!this.state.isEdit)
							? (this.props.contact.lname || "")
							: this.state.lname}
						onChange = {this.editData}/>
				</td>
				{/*TODO(Levi): Find out how format as phone number*/}
			<td>
			<input
				disabled = {!this.state.isEdit}
				name="email"
				type = "text"
				className ="form-control"
				value =	{
					(!this.state.isEdit)
					? (this.props.contact.email || "")
					: this.state.email}
				onChange = {this.editData}/>
			</td>
				<td>
					<input
						disabled = {!this.state.isEdit}
						name="phone"
						type = "text"
						className = "form-control"
						value =	{
							(!this.state.isEdit)
							? (this.props.contact.phone|| "")
							: this.state.phone}
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
	constructor(props)
	{
		super(props)
	}
	render() {
		//this.props.loadContacts();
		// Do some js stuff outside of the return of jsx.
		var rows = [];
		//TODO(Levi): search should not be case sensitive
		// edit this line
		var temp = this.props.contacts;
		temp.sort((a,b) => (a.fname + a.lname) > (b.fname + b.lname) ? 1 : -1)
		this.props.contacts.forEach(
			(contact) => {
				let fullName = contact.fname + " " + contact.lname;
				fullName = fullName.toLowerCase();
					if(fullName.includes(this.props.searchText.toLowerCase()) == false) {
						return;
					}
					rows.push(
						<ContactRow
							loadContacts = {this.props.loadContacts}
							key = {Math.random() * 1000000/*should probably make keys differently*/}
							contact ={contact}
							onDelete= {this.props.onDelete}
							editContact={this.props.editContact}/>
						)
			}
		)
		return (
			<table className ="table table-hover">
				<thead>
					<tr className="primary">
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone"><img src={Pokeball} class="ContactPageIcon" style={{marginRight: '5px'}}></img></span>	First Name
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone"><img src={Pokeball} class="ContactPageIcon" style={{marginRight: '5px'}}></img></span>	Last Name
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
							 <span aria-label="phone"><img src={PokemonEmail} class="ContactPageIcon" style={{marginRight: '5px'}}></img></span>Email
						</th>
						<th>
							<i className="fa fa-fw">
							</i>
						<span aria-label="phone"><img src={PokemonPhone} class="ContactPageIcon"></img></span>	Phone
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
			owner: localStorage.getItem("userID")
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
						<Form.Label className="font-weight-bold">First name</Form.Label>
						<Form.Control
						type="text"
						name="fname"
						placeholder="John"
						value={this.state.fname}
						onChange={e=> this.handleChange(e)}
						/>
					</Form.Group>
					<Form.Group as = {Form.Col} md="4">
						<Form.Label className="font-weight-bold">Last name</Form.Label>
						<Form.Control
						type="text"
						name="lname"
						placeholder = "Doe"
						onChange={this.handleChange}
						value={this.state.lname}
						/>
					</Form.Group>

					<Form.Group as = {Form.Col} md="6">
						<Form.Label className="font-weight-bold">Email </Form.Label>
						<Form.Control
							type="email"
							placeholder = "@"
							name="email"
							value={this.state.email}
							onChange={e => this.handleChange(e)}
						/>
					</Form.Group>
					<Form.Group as = {Form.Col} md="6">
						<Form.Label className="font-weight-bold">Phone Number </Form.Label>
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
						className="btn btn-link  btn-sm"
						onClick ={this.handleSubmit}>
						<b><span aria-label="plus">
						<img src={AddFriend} className="Gotcha"></img>
						</span>
						</b>
						</button>
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
					autoFocus={true}
					/>
				</Form.Group>
				<Form.Group as = {Form.Col} md="3">
				<button
				type="button"
				className="btn"
				onClick={this.handleSubmit}
				><b><span role="img" aria-label="Search"><img src={SearchIcon} className="ContactPageSettingIcon" style={{marginRight: '5px'}}/></span></b>Search</button>
				</Form.Group>
				</Form.Row>
			</Form>
		)
	}
}
export default Contact;

export default class CustomerModel{
    constructor(id,first_name,last_name,mobile,email,address) {
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._mobile = mobile;
        this._email = email;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get first_name() {
        return this._first_name;
    }

    set first_name(value) {
        this._first_name = value;
    }

    get last_name() {
        return this._last_name;
    }

    set last_name(value) {
        this._last_name = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}


//class ek import ke gnn methnin export krnn oni.export kr gnn type 2i.
//     01)export - import{CustomerModel} form"./model/customerModel.js" (.js aniwaryai)  (me file ek athule thiyan hama class ekkm gnn puluwn)
//     02)defalt ekk - import CustomerModel form "./model/customerModel.js"  (mekedi file eke kochchr class thibbath default kiyl dila thiyn class ek withri genne)
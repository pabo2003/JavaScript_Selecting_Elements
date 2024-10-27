//import class Customer
import CustomerModel from "../model/customerModel.js";
import {customer_array,item_array,order_array} from "../DB/database";

//pos validation//
const validateEmail = (email)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile)=>{
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

//***************************************Customer**************************************************//
//customer array
let customer = [];
let selectedCustomerIndex = null;

const cleanCustomerForm = ()=>{
    $('#firstName').val("");
    $('#lastName').val("");
    $('#mobile').val("");
    $('#email').val("");
    $('#address').val("");
}
const load_customer_Table = ()=>{
    $('#customerTableBody').empty();
    customer.map((item,index)=>{
        // console.log(item);
        let data =`<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    });

    $('#customerTableBody').on('click','tr',function () {
        selectedCustomerIndex = $(this).index();
        console.log("Customer:-",selectedCustomerIndex);

        //get customer object in array
        let  customer1 = customer[selectedCustomerIndex];
        console.log(customer1);

        //get customer details in customer object
        let firstName = customer1.first_name;
        let lastName = customer1.last_name;
        let mobile = customer1.mobile;
        let email1 = customer1.email;
        let address1 = customer1.address;

        $('#firstName').val(firstName);
        $('#lastName').val(lastName);
        $('#mobile').val(mobile);
        $('#email').val(email1);
        $('#address').val(address1);
    })
}

//Add customer button//
$("#cu_Add").on("click",function (){
    let first_name = $("#firstName").val();  //empty
    let last_name = $("#lastName").val();   //empty
    let Mobile = $("#mobile").val();   //empty
    let email = $("#email").val();   //empty
    let address = $("#address").val();   //empty

    console.log(first_name);
    console.log(last_name);
    console.log(Mobile);
    console.log(email);
    console.log(address);

    if (first_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill first name!",
        });
    }else if (last_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill last name!",
        });
    }else if (!validateMobile(Mobile)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "incorrect mobile!",
        });
    }else if (!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "incorrect email!",
        });
    }else if (address.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill address!",
        });
    }else{
        /*//literal type
        let person = {
            id : customer.length+1,
            first_name : first_name,
            last_name : last_name,
            mobile: Mobile,
            email : email,
            address :address
        }*/
        /*class type*/
        let person = new CustomerModel(
            customer.length+1,
            first_name,
            last_name,
            Mobile,
            email,
            address
        );
        customer.push(person);
        load_customer_Table();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }



    cleanCustomerForm();
});

//update customer button//
$("#cu_Update").on('click',function () {
    let first_name = $("#firstName").val();
    let last_name = $("#lastName").val();
    let Mobile = $("#mobile").val();
    let email = $("#email").val();
    let address = $("#address").val();

    if (first_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill first name!",
        });
    }else if (last_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill last name!",
        });
    }else if (!validateMobile(Mobile)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "incorrect mobile!",
        });
    }else if (!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "incorrect email!",
        });
    }else if (address.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill address!",
        });
    }else{
        /*let customer2 = {
            id : customer[selectedCustomerIndex].id,
            first_name : first_name,
            last_name : last_name,
            mobile: Mobile,
            email : email,
            address :address
        }*/
        let customer2 = new CustomerModel(
            customer[selectedCustomerIndex].id,
            first_name,
            last_name,
            Mobile,
            email,
            address
        );
        customer[selectedCustomerIndex] = customer2;
        load_customer_Table();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }

   cleanCustomerForm();
});

//Delete customer button//
$("#cu_Delete").on('click',function () {
    customer.splice(selectedCustomerIndex,1);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

    cleanCustomerForm();

    load_customer_Table();
});


/*//!***************************************Item**************************************************!//
//customer array
let itemArray = [];
let selectedItemIndex = null;

const load_item_Table = ()=>{
    $('#itemTableBody').empty();
    itemArray.map((item,index)=>{
        // console.log(item);
        let data =`<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    });

    $('#customerTableBody').on('click','tr',function () {
        selectedCustomerIndex = $(this).index();
        console.log("Customer:-",selectedCustomerIndex);

        //get customer object in array
        let  customer1 = customer[selectedCustomerIndex];
        console.log(customer1);

        //get customer details in customer object
        let firstName = customer1.first_name;
        let lastName = customer1.last_name;
        let mobile = customer1.mobile;
        let email1 = customer1.email;
        let address1 = customer1.address;

        $('#firstName').val(firstName);
        $('#lastName').val(lastName);
        $('#mobile').val(mobile);
        $('#email').val(email1);
        $('#address').val(address1);
    })
}

//Add customer button//
$("#item_Add").on("click",function (){
    let item_name = $("#itemName").val();
    let qty = $("#qty").val();
    let description = $("#itemDescription").val();
    let price = $("#price").val();

    console.log(item_name);
    console.log(qty);
    console.log(description);
    console.log(price);

    let item = {
        id : customer.length+1,
        first_name : item_name,
        last_name : qty,
        mobile: description,
        email : price
    }
    itemArray.push(item);
    load_item_Table();

    $('#itemName').val("");
    $('#qty').val("");
    $('#itemDescription').val("");
    $('#price').val("");
});

//update customer button//
$("#cu_Update").on('click',function () {
    let first_name = $("#firstName").val();
    let last_name = $("#lastName").val();
    let Mobile = $("#mobile").val();
    let email = $("#email").val();
    let address = $("#address").val();

    let customer2 = {
        id : customer[selectedCustomerIndex].id,
        first_name : first_name,
        last_name : last_name,
        mobile: Mobile,
        email : email,
        address :address
    }
    customer[selectedCustomerIndex] = customer2;
    load_customer_Table();

    $('#firstName').val("");
    $('#lastName').val("");
    $('#mobile').val("");
    $('#email').val("");
    $('#address').val("");
});

//Delete customer button//
$("#cu_Delete").on('click',function () {
    customer.splice(selectedCustomerIndex,1);

    $('#firstName').val("");
    $('#lastName').val("");
    $('#mobile').val("");
    $('#email').val("");
    $('#address').val("");

    load_customer_Table();
});*/
































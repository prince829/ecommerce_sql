'use strict';
let allow_to_navigate = true;

let FormControls = function () {
    let addNewUserValidation = function () {
        $("#add-new-user").validate({
            rules: {
                first_name: {
                    required: true,
                    letterswithbasicpunc: true,

                },
                last_name: {
                    required: true,
                    letterswithbasicpunc: true,

                },
                email: {
                    emailValidation: true,
                    required: true,
                    
                },
                password: { required: true },
                confirm_password: { required: true, matchConfirmPassword: true }
            },
            messages: {
                first_name: {
                    required: "Please enter first name",
                    letterswithbasicpunc: "Please enter alphabets only",

                },
                last_name: {
                    required: "Please enter last name",
                    letterswithbasicpunc: "Please enter alphabets only",

                },
                email: {
                    required: "Please enter email",
                    emailValidation: "Please enter a valid email"
                },
                password: { required: 'Please enter password' },
                confirm_password: { required: 'Please enter confirm password', matchConfirmPassword: 'Password and confirm password does not match' },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }

    let adminAcntFrmValidation = function () {
        $("#adminAcntFrm").validate({
            rules: {
                first_name: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3
                },
                last_name: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    emailValidation: true,
                }
            },
            messages: {
                first_name: {
                    required: "Please enter your first name",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid firstname"
                },
                last_name: {
                    required: "Please enter your last name",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid lastname"
                },
                email: {
                    required: "Please enter your email",
                    emailValidation: "Please enter a valid email"
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }

    let adminChangePasswordValidation = function () {
        $("#adminChangePassword").validate({
            rules: {
                'old_password': {
                    required: true
                },
                'password': {
                    required: true,
                    minlength: 8
                },
                'confirm-new-password': {
                    required: true,
                    minlength: 8,
                    equalTo: '#account-new-password'
                }
            },
            messages: {
                'old_password': {
                    required: 'Enter old password'
                },
                'password': {
                    required: 'Enter new password',
                    minlength: 'Enter at least 8 characters'
                },
                'confirm-new-password': {
                    required: 'Please confirm new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'The password and its confirm are not the same'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }

    let formChangePasswordValidation = function () {
        $("#formChangePassword").validate({
            rules: {
                newPassword: {
                    required: true,
                    required: true,
                    // pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    minlength: 8
                },
                confirmPassword: {
                    required: true,
                    minlength: 8,
                    equalTo: '#newPassword'
                }
            },
            messages: {
                newPassword: {
                    required: 'Enter new password',
                    // pattern: "Please meet password field's minimum requirements",
                    minlength: 'Enter at least 8 characters'
                },
                confirmPassword: {
                    required: 'Please confirm new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'The password and its confirm are not the same'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }

    let addNewCmsValidation = function () {
        jQuery.validator.addMethod("noSpace",function(value,element){
            return value.trim() !=''
        },"No space please and don't leave it empty");
        $("#add-new-cms").validate({
            rules: {
                'title': {
                    required: true,
                    minlength: 3,
                    noSpace:true
                }
            },
            messages: {
                'title': {
                    required: 'Title is required',
                    minlength: "Please enter a valid title"
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }



    let addFaqFormValidation = function () {
        $("#addFaqForm").validate({
            rules: {
                'question': {
                    required: true
                },
                'answer': {
                    required: true
                }
            },
            messages: {
                'question': {
                    required: 'A question is required',
                },
                'answer': {
                    required: 'An answer is required',
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    }
    let CategoryFormValidation = function () {
        jQuery.validator.addMethod("noSpace",function(value,element){
            return value.trim() !=''
        },"No space please and don't leave it empty");
        $("#categoryFrm").validate({
            rules: {
                'title': {
                    required: true,
                    noSpace:true
                },
            },
            messages: {
                'title': {
                    required: 'Title is required',
                },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                 form[0].submit();
            }
        });
    };
  


    return {
        init: function () {
            addNewUserValidation();
            adminAcntFrmValidation();
            adminChangePasswordValidation();
            formChangePasswordValidation();
            addNewCmsValidation();
            addFaqFormValidation();
            CategoryFormValidation();
        }
    };
}();

// Form Validation Initialize
$(document).ready(function () {
    FormControls.init();
    
//     // Handle Dirty Form
//     $('form').on('change', function() {
//         allow_to_navigate = false;
//         // $(this).find("button[type='reset']").prop('disabled', false);
//         $(this).find("button[type='submit']").prop('disabled', false);
//     });

//     $("button[type='reset']").on("click", function() {
//         allow_to_navigate = true;
//         // $("button[type='reset']").prop('disabled', true);
//         $("button[type='submit']").prop('disabled', true);
//     });
// /*
//     if ($(document).find("form").length) {
//         // $("button[type='reset']").prop('disabled', true);
//         $("button[type='submit']").prop('disabled', false);
//         let current__active_menu = $('li.active');
//         window.addEventListener('beforeunload', function (event) {
//             if (!allow_to_navigate) {
//                 event.preventDefault();
//                 event.returnValue = 'You have unsaved changes. Are you sure you want to navigate anyway?';
//             }
//         });

//         $('li').on('click', function () {
//             if (!allow_to_navigate) {
//                 setTimeout(function () {
//                     $('li').removeClass('active');
//                     if ($(current__active_menu).length) {
//                         for (let i=0;i<$(current__active_menu).length;i++) {
//                             $($(current__active_menu)[i]).addClass('active');
//                         }
//                     }
//                 }, 10);
//             }
//         });

//         $('form').submit(function(){
//             allow_to_navigate = true;
//         });
//     }*/
//     // Handle Dirty Form
});

jQuery.validator.addMethod("emailValidation", function (value, element) {
    return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(value);
})


jQuery.validator.addMethod("matchConfirmPassword", function (value, element) {
    if (value == $('#password').val()) {
        return true;
    } else {
        return false;
    }
})
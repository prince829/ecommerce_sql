

('use strict');
// Revoke User Access
$(document).on('click', '.revoke_access', function () {
    let location = $(this).attr('data-location');
    let path = $(this).attr('data-url');
    if (location) {
        window.location.href = window.location.protocol + '//' + window.location.host + location + (path ? '?path=' + path : '');
    }
});
// Revoke User Access

// handle-date-time start

$(document).ready(function () {
    let allDates = document.querySelectorAll('.handle-date-time');
    if (allDates) {
        allDates.forEach((item, index, parent) => {
            let dateTime = $(item).attr('data-time');
            if (dateTime) {
                let timeText = '';
                let past24HrStartTime = moment().subtract(24, 'hours');
                if (moment(past24HrStartTime).isSameOrBefore(dateTime)) {
                    timeText = moment(dateTime).fromNow();
                } else {
                    timeText = moment(dateTime).format('YYYY-MM-DD hh:mm A');
                }
                $(item).text(timeText);
            }
        });
    }

    let select2 = $('.select2'),
        accountNumberMask = $('.dt-contact'),
        accountZipCode = $('.account-zip-code'),
        accountUploadImg = $('#account-upload-img'),
        uploadSliderImg=$('#slider-upload-img'),
        accountUploadBtn = $('#account-upload'),
        uploadSliderBtn=$('#slider-upload'),
        accountUserImage = $('.uploadedAvatar'),
        sliderImg=$('.sliderAvatar'),
        accountResetBtn = $('#account-reset'),
        sliderResetBtn=$('#slider-reset');
    //phone
    if (accountNumberMask.length) {
        accountNumberMask.each(function () {
            new Cleave($(this), {
                phone: true,
                phoneRegionCode: 'US'
            });
        });
    }

    //zip code
    if (accountZipCode.length) {
        accountZipCode.each(function () {
            new Cleave($(this), {
                delimiter: '',
                numeral: true
            });
        });
    }

    // For all Select2
    if (select2.length) {
        select2.each(function () {
            let $this = $(this);
            // $this.wrap('<div class="position-relative"></div>');
            // $this.select2({
            //     dropdownParent: $this.parent()
            // });
        });
    }

    // Update slider photo on click of button
    if (sliderImg) {
        let resetImage = sliderImg.attr('src');
        uploadSliderBtn.on('change', function (e) {
            let reader = new FileReader(),
                files = e.target.files;
            reader.onload = function () {
                if (uploadSliderImg) {
                    uploadSliderImg.attr('src', reader.result);
                    $('#imageUploadId').attr('href', URL.createObjectURL(files[0]))
                }

            };
            reader.readAsDataURL(files[0]);
            sliderResetBtn.removeClass("d-none");
        });

        sliderResetBtn.on('click', function () {
            sliderImg.attr('src', resetImage);
            sliderResetBtn.addClass("d-none");
        });
    }

    // Update user photo on click of button
    if (accountUserImage) {
        let resetImage = accountUserImage.attr('src');
        accountUploadBtn.on('change', function (e) {
            let reader = new FileReader(),
                files = e.target.files;
            reader.onload = function () {
                if (accountUploadImg) {
                    accountUploadImg.attr('src', reader.result);
                    $('#imageUploadId').attr('href', URL.createObjectURL(files[0]))
                }

            };
            reader.readAsDataURL(files[0]);
            accountResetBtn.removeClass("d-none");
        });

        accountResetBtn.on('click', function () {
            accountUserImage.attr('src', resetImage);
            accountResetBtn.addClass("d-none");
        });
    }
    //Upload Icon for country
    let countryImage=$('#country-upload-img'),
        countryUploadBtn=$("#country-upload"),
        countryUploadImg=$("#country-upload-img"),
        countryresetBtn=$("#country-reset");
        if(countryImage){
            let resetImage=countryImage.attr('src');
            countryUploadBtn.on('change',function(e){
                let reader=new FileReader(),
                files=e.target.files;
                reader.onload=function(){
                    if(countryUploadImg){
                        countryUploadImg.attr('src',reader.result);

                    }
                };
                reader.readAsDataURL(files[0]);
                countryresetBtn.removeClass("d-none")
            });
            countryresetBtn.on('click', function () {
                countryImage.attr('src', resetImage);
                countryresetBtn.addClass("d-none");
            });
        }

});



// handle-date-time ends


// select 2
$(document).ready(function () {
    $('.js-example-basic-multiple').select2();
});


$(document).on("change", "#letter", function (e) {
    e.preventDefault();
    let lettrValue = $('#letter').val();
    let labelHtml = document.getElementById('lettrCountLabel');
    labelHtml.innerHTML = ""
    switch (parseInt(lettrValue)) {
        case 1:
            labelHtml.insertAdjacentHTML('beforeend', 'Total LettersTotal Letters"(A)"');
            break;
        case 2:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-B)');
            break;
        case 3:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-C)');
            break;
        case 4:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-D)');
            break;
        case 5:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-E)');
            break;
        case 6:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-F)');
            break;
        case 7:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-G)');
            break;
        case 8:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-H)');
            break;
        case 9:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-I)');
            break;
        case 10:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-J)');
            break;
        case 11:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-K)');
            break;
        case 12:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-L)');
            break;
        case 13:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-M)');
            break;
        case 14:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-N)');
            break;
        case 15:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-O)');
            break;
        case 17:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-P)');
            break;
        case 17:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-Q)');
            break;
        case 18:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-R)');
            break;
        case 19:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-S)');
            break;
        case 20:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-T)');
            break;
        case 21:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-U)');
            break;
        case 22:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-V)');
            break;
        case 23:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-W)');
            break;
        case 24:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-X)');
            break;
        case 25:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-Y)');
            break;
        case 26:
            labelHtml.insertAdjacentHTML('beforeend', 'Total Letters(A-Z)');
            break;
    }
})
$(document).on('change', '#is_free', function () {
    if ($('#is_free').is(':checked')) {
        let labelHtml_ticket = document.getElementById('labelfor_tckt_qty');
    labelHtml_ticket.innerHTML = '';
    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity`)
    }
});
$(document).on('change', '#ticket_alphabet', function () {
    if (!$('#ticket_alphabet').is(':checked')) {
        let labelHtml_ticket = document.getElementById('labelfor_tckt_qty');
    labelHtml_ticket.innerHTML = '';
    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity`)
    } 
});
/***********************Ticket Quantity Start ***********************/
$(document).on('change', '#ticket_qty', function (e) {
    e.preventDefault();
    let alphabets = ['A', "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let ticketVal = parseInt($('#ticket_qty').val());
    let labelHtml_ticket = document.getElementById('labelfor_tckt_qty');
    // labelHtml_ticket.innerHTML = '';
    let lettrValue = parseInt($('#letter').val());
    let isFree = false;
    let isAlphaNumeric = false
    ///For free
    if ($('#is_free').is(':checked')) {
        isFree = true;
       
    };
    $(document).on('change', '#is_free', function () {
        console.log($('#is_free').is(':checked'));
        if ($('#is_free').is(':checked')) {
            isFree = true;
        } else {
            isFree = false;
        }
    });
    //For AlphaNumeric
    if ($('#ticket_alphabet').is(':checked')) {
        isAlphaNumeric = true;
    };
    $(document).on('change', '#ticket_alphabet', function () {
        if ($('#ticket_alphabet').is(':checked')) {
            isAlphaNumeric = true;
        } else {
            isAlphaNumeric = false;
        }
    });
    ///For ticket label
    if (isFree == false && isAlphaNumeric === true) {
        if (ticketVal <= 2600) {
            if (ticketVal >= lettrValue * 100) {
                let dividedletter = ticketVal / lettrValue;
                console.log(dividedletter,'dividedletter');
                let per_letter = Math.round(ticketVal / lettrValue);
                console.log(per_letter,'per_letter');
                let decimalVal = dividedletter - per_letter;
                console.log(decimalVal,'decimalVal');
                let lettr_countA = per_letter;
                let last_lettr_count = per_letter
                if (decimalVal < 0.5 && decimalVal>0) {
                    let left_number = ticketVal - (per_letter * lettrValue);
                    lettr_countA = lettr_countA + left_number
                }
                if (ticketVal < per_letter * lettrValue) {
                    last_lettr_count = ticketVal - (per_letter * (lettrValue - 1))
                }
                let mid_length = 0;
                if (lettrValue > 2) {
                    mid_length = lettrValue - 2;
                    if (mid_length == 1) {
                        labelHtml_ticket.innerHTML = '';
                        labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${per_letter},C:${last_lettr_count})`)
                    } else {
                        labelHtml_ticket.innerHTML = '';
                        labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B-${alphabets[mid_length]}:${per_letter},${alphabets[lettrValue-1]}:${last_lettr_count})`)
                    }
                } else if(lettrValue>1 &&lettrValue<=2)  {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${last_lettr_count})`)
                }else{
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA})`)
                }
            } else {
                if (ticketVal <= 100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${ticketVal})`)
                } else if (ticketVal > 100 && ticketVal <= 200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:100,B:${ticketVal - 100})`)
                } else if (ticketVal > 200 && ticketVal <= 300) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-B:100,C:${ticketVal - 200})`)
                } else if (ticketVal > 300 && ticketVal <= 400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-C:100,D:${ticketVal - 300})`)
                } else if (ticketVal > 400 && ticketVal <= 500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-D:100,E:${ticketVal - 400})`)
                } else if (ticketVal > 500 && ticketVal <= 600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-E:100,F:${ticketVal - 500})`)
                } else if (ticketVal > 600 && ticketVal <= 700) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-F:100,G:${ticketVal - 600})`)
                } else if (ticketVal > 700 && ticketVal <= 800) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-G:100,H:${ticketVal - 700})`)
                } else if (ticketVal > 800 && ticketVal <= 900) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-H:100,I:${ticketVal - 800})`)
                } else if (ticketVal > 900 && ticketVal <= 1000) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-I:100,J:${ticketVal - 900})`)
                } else if (ticketVal > 1000 && ticketVal <= 1100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-J:100,K:${ticketVal - 1000})`)
                } else if (ticketVal > 1100 && ticketVal <= 1200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-K:100,L:${ticketVal - 1100})`)
                } else if (ticketVal > 1200 && ticketVal <= 1300) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-L:100,M:${ticketVal - 1200})`)
                } else if (ticketVal > 1300 && ticketVal <= 1400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-M:100,N:${ticketVal - 1300})`)
                } else if (ticketVal > 1400 && ticketVal <= 1500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-N:100,O:${ticketVal - 1400})`)
                } else if (ticketVal > 1500 && ticketVal <= 1600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-O:100,P:${ticketVal - 1500})`)
                } else if (ticketVal > 1600 && ticketVal <= 1700) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-P:100,Q:${ticketVal - 1600})`)
                } else if (ticketVal > 1700 && ticketVal <= 1800) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-Q:100,R:${ticketVal - 1700})`)
                } else if (ticketVal > 1800 && ticketVal <= 1900) {
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-R:100,S:${ticketVal - 1800})`)
                } else if (ticketVal > 1900 && ticketVal <= 2000) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-S:100,T:${ticketVal - 1900})`)
                }
                else if (ticketVal > 2000 && ticketVal <= 2100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-T:100,U:${ticketVal - 2000})`)
                }
                else if (ticketVal > 2100 && ticketVal <= 2200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-U:100,V:${ticketVal - 2100})`)
                } else if (ticketVal > 2200 && ticketVal <= 2300) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-V:100,W:${ticketVal - 2200})`)
                } else if (ticketVal > 2300 && ticketVal <= 2400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-W:100,X:${ticketVal - 2300})`)
                }
                else if (ticketVal > 2400 && ticketVal <= 2500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-X:100,Y:${ticketVal - 2400})`)
                } else if (ticketVal > 2500 && ticketVal <= 2600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-Y:100,Z:${ticketVal - 2500})`)
                }
            }

        } else {
            let dividedletter = ticketVal / lettrValue;
            let per_letter = Math.round(ticketVal / lettrValue);
            let decimalVal = dividedletter - per_letter;
            let lettr_countA = per_letter;
            let last_lettr_count = per_letter
            if (decimalVal < 0.5 && decimalVal>0) {
                let left_number = ticketVal - (per_letter * lettrValue);
                lettr_countA = lettr_countA + left_number
            }
            if (ticketVal < per_letter * lettrValue) {
                last_lettr_count = ticketVal - (per_letter * (lettrValue - 1))
            }
            let mid_length = 0;
            if (lettrValue > 2) {
                mid_length = lettrValue - 2;
                if (mid_length == 1) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${per_letter},C:${last_lettr_count})`)
                } else {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B-${alphabets[mid_length]}:${per_letter},${alphabets[lettrValue-1]}:${last_lettr_count})`)
                }
            }else if(lettrValue>1 &&lettrValue<=2)  {
                labelHtml_ticket.innerHTML = '';
                labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${last_lettr_count})`)
            }else{
                labelHtml_ticket.innerHTML = '';
                labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA})`)
            }
        }
    }
});

//For Ready Event
$(document).ready( function (e) {
    let alphabets = ['A', "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let ticketVal = parseInt($('#ticket_qty').val());
    let labelHtml_ticket = document.getElementById('labelfor_tckt_qty');
    // labelHtml_ticket.innerHTML = '';
    let lettrValue = parseInt($('#letter').val());
    let isFree = false;
    let isAlphaNumeric = false
    ///For free
    if ($('#is_free').is(':checked')) {
        isFree = true;
       
    };
    //For AlphaNumeric
    if ($('#ticket_alphabet').is(':checked')) {
        isAlphaNumeric = true;
    };
    ///For ticket label
    if (isFree == false && isAlphaNumeric === true) {
        if (ticketVal <= 2600) {
            if (ticketVal >= lettrValue * 100) {
                let dividedletter = ticketVal / lettrValue;
                let per_letter = Math.round(ticketVal / lettrValue);
                let decimalVal = dividedletter - per_letter;
                let lettr_countA = per_letter;
                let last_lettr_count = per_letter
                if (decimalVal < 0.5 && decimalVal>0) {
                    let left_number = ticketVal - (per_letter * lettrValue);
                    lettr_countA = lettr_countA + left_number
                }
                if (ticketVal < per_letter * lettrValue) {
                    last_lettr_count = ticketVal - (per_letter * (lettrValue - 1))
                }
                let mid_length = 0;
                if (lettrValue > 2) {
                    mid_length = lettrValue - 2;
                    if (mid_length == 1) {
                        labelHtml_ticket.innerHTML = '';
                        labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${per_letter},C:${last_lettr_count})`)
                    } else {
                        labelHtml_ticket.innerHTML = '';
                        labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B-${alphabets[mid_length]}:${per_letter},${alphabets[lettrValue-1]}:${last_lettr_count})`)
                    }
                } else if(lettrValue>1 &&lettrValue<=2)  {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${last_lettr_count})`)
                }else{
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA})`)
                }
            } else {
                if (ticketVal <= 100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${ticketVal})`)
                } else if (ticketVal > 100 && ticketVal <= 200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:100,B:${ticketVal - 100})`)
                } else if (ticketVal > 200 && ticketVal <= 300) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-B:100,C:${ticketVal - 200})`)
                } else if (ticketVal > 300 && ticketVal <= 400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-C:100,D:${ticketVal - 300})`)
                } else if (ticketVal > 400 && ticketVal <= 500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-D:100,E:${ticketVal - 400})`)
                } else if (ticketVal > 500 && ticketVal <= 600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-E:100,F:${ticketVal - 500})`)
                } else if (ticketVal > 600 && ticketVal <= 700) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-F:100,G:${ticketVal - 600})`)
                } else if (ticketVal > 700 && ticketVal <= 800) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-G:100,H:${ticketVal - 700})`)
                } else if (ticketVal > 800 && ticketVal <= 900) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-H:100,I:${ticketVal - 800})`)
                } else if (ticketVal > 900 && ticketVal <= 1000) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-I:100,J:${ticketVal - 900})`)
                } else if (ticketVal > 1000 && ticketVal <= 1100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-J:100,K:${ticketVal - 1000})`)
                } else if (ticketVal > 1100 && ticketVal <= 1200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-K:100,L:${ticketVal - 1100})`)
                } else if (ticketVal > 1200 && ticketVal <= 1300) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-L:100,M:${ticketVal - 1200})`)
                } else if (ticketVal > 1300 && ticketVal <= 1400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-M:100,N:${ticketVal - 1300})`)
                } else if (ticketVal > 1400 && ticketVal <= 1500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-N:100,O:${ticketVal - 1400})`)
                } else if (ticketVal > 1500 && ticketVal <= 1600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-O:100,P:${ticketVal - 1500})`)
                } else if (ticketVal > 1600 && ticketVal <= 1700) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-P:100,Q:${ticketVal - 1600})`)
                } else if (ticketVal > 1700 && ticketVal <= 1800) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-Q:100,R:${ticketVal - 1700})`)
                } else if (ticketVal > 1800 && ticketVal <= 1900) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-R:100,S:${ticketVal - 1800})`)
                } else if (ticketVal > 1900 && ticketVal <= 2000) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-S:100,T:${ticketVal - 1900})`)
                }
                else if (ticketVal > 2000 && ticketVal <= 2100) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-T:100,U:${ticketVal - 2000})`)
                }
                else if (ticketVal > 2100 && ticketVal <= 2200) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-U:100,V:${ticketVal - 2100})`)
                } else if (ticketVal > 2200 && ticketVal <= 2300) {
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-V:100,W:${ticketVal - 2200})`)
                } else if (ticketVal > 2300 && ticketVal <= 2400) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-W:100,X:${ticketVal - 2300})`)
                }
                else if (ticketVal > 2400 && ticketVal <= 2500) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-X:100,Y:${ticketVal - 2400})`)
                } else if (ticketVal > 2500 && ticketVal <= 2600) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A-Y:100,Z:${ticketVal - 2500})`)
                }
            }

        } else {
            let dividedletter = ticketVal / lettrValue;
            let per_letter = Math.round(ticketVal / lettrValue);
            let decimalVal = dividedletter - per_letter;
            let lettr_countA = per_letter;
            let last_lettr_count = per_letter
            if (decimalVal < 0.5 && decimalVal>0) {
                let left_number = ticketVal - (per_letter * lettrValue);
                lettr_countA = lettr_countA + left_number
            }
            if (ticketVal < per_letter * lettrValue) {
                last_lettr_count = ticketVal - (per_letter * (lettrValue - 1))
            }
            let mid_length = 0;
            if (lettrValue > 2) {
                mid_length = lettrValue - 2;
                if (mid_length == 1) {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${per_letter},C:${last_lettr_count})`)
                } else {
                    labelHtml_ticket.innerHTML = '';
                    labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B-${alphabets[mid_length]}:${per_letter},${alphabets[lettrValue-1]}:${last_lettr_count})`)
                }
            } else if(lettrValue>1 &&lettrValue<=2)  {
                labelHtml_ticket.innerHTML = '';
                labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA},B:${last_lettr_count})`)
            }else{
                labelHtml_ticket.innerHTML = '';
                labelHtml_ticket.insertAdjacentHTML("beforeend", `Ticket Quantity(A:${lettr_countA})`)
            }
        }
    }
})
/***********************Ticket Quantity End ************************/
processForm = (e) => {
    e.preventDefault();
    validationEmailField()
    var data = $('#mainForm').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if (typeof data.businessSize === 'undefined') {
        $('#businessSize').addClass('invalidBox')
        $('#invalidBusinessSizeField').text('Please select a business size')
        $('#businessSizeIcon').replaceWith('<span id="businessSizeIcon" class="fas fa-exclamation-triangle"></span>')
    } else {
        if ($('#businessEmail').hasClass('validBox')) {
            var invalidImportance = new Set(['documentStorage', 'fullTextSearch', 'price'])
            if (data.businessSize === '1-10' || invalidImportance.has(data.secondRadioField)) {
                $(".mainContent").load("UnqualifiedLead.html");
            } else {
                $(".mainContent").load("QualifiedLead.html");
            }
        }
    }
}

validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

validationEmailField = () => {
    var businessEmail = $('#businessEmail')
    businessEmail.removeClass('invalidBox')
    businessEmail.removeClass('validBox')
    var isEmailValid = validateEmail(document.getElementById('businessEmail').value)
    if (isEmailValid) {
        businessEmail.addClass('validBox')
        $('#emailIcon').replaceWith('<span id="emailIcon" class="fas fa-check-circle"></span>')
        $('#invalidEmailField').text('')
    } else {
        businessEmail.addClass('invalidBox')
        $('#emailIcon').replaceWith('<span id="emailIcon" class="fas fa-exclamation-triangle"></span>')
        $('#invalidEmailField').text('Please enter a correct email')
    }
}

selectedBusinessSize = () => {
    $('#businessSize').addClass('validBox')
    $('#invalidBusinessSizeField').text('')
    $('#businessSizeIcon').replaceWith('<span id="businessSizeIcon" class="fas fa-check-circle"></span>')
}

$(document).ready(() => {
    var form = document.getElementById('mainForm')
    if (form.attachEvent) {
        form.attachEvent("submit", processForm)
    } else {
        form.addEventListener("submit", processForm)
    }
    var emailField = document.getElementById('businessEmail');
    emailField.addEventListener('keyup', validationEmailField);
    var businessSize = document.getElementById('businessSize')
    businessSize.addEventListener('change', selectedBusinessSize)
})

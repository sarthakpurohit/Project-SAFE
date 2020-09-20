function responsiveNavbar(){
    $('#responsive-nav').addClass('rvp-responsive-nav-enable');
    $('#responsive-nav-content').addClass('rvp-opaque');
}

function removeResponsiveNavbar(){
    $('#responsive-nav').removeClass('rvp-responsive-nav-enable');
    $('#responsive-nav-content').removeClass('rvp-opaque');
}

function openLogin(){
    $('#login-form').removeClass('rvp-login-margin');
}

function closeLogin(){
    $('#login-form').addClass('rvp-login-margin');
}

function openSignup(){
    console.log('hello');
    $('#signup-form').addClass('rvp-login-margin');
    $('#signup-mobile-form').addClass('rvp-login-margin');
    $('#forms').addClass('rvp-overflow');
}

function closeSignup(){
    $('#signup-form').removeClass('rvp-login-margin');
    $('#signup-mobile-form').removeClass('rvp-login-margin');
    $('#forms').removeClass('rvp-overflow');
}
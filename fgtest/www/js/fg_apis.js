/*! fg_apis v0.0.1 | Riccardo Bruno <riccardo.bruno@ct.infn.it | apache2/license */

// This js file provides a set of macro functions able to deal with FutureGateway
// APIs. These functions are meant to facilitate the development of web GUIs
// making use of FG APIs

// Variable that stores information about the fgAPIServer front-end; this is
// normally contained in the js file fg_config.js
//var fg_info = {
//    apiserver_url: 'http://<fghost>[:<fgport>][/endpoint]/<fg_version>',
//    token = <the current valid token>
//};

// api_result variable contains the json output of last called API (if any)
var api_result = null;
// api_return_code contains the last executed API call return code
var api_return_code = null;

// infra_create - Function that creates a new infrastructure using FG APIs
function infra_create(infra_json_data) {
    $.ajax({
        url:  fg_info.apiserver_url+'/infrastructures',
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "POST", 
        cache: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(infra_json_data),
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = { 
            'message': 'Failed to create infrastructure (' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data; 
        console.log("success:" + api_return_code);
    });
}

// infra_list - Function that lists all available infrastructures
function infra_list() {
    $.ajax({
        url:  fg_info.apiserver_url+'/infrastructures',
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "GET",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = { 
            'message': 'Failed to list infrastructures (' + api_return_code + ')' 
        };
        console.log("failed:" + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data; 
        console.log("success:" + api_return_code);
    });
}

// infra_show - Function that shows the given infrastructure id
function infra_show(infra_id) {
    $.ajax({
        url:  fg_info.apiserver_url + '/infrastructures/' + infra_id,
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "GET",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to show infrastructure having id '
                     + infra_id + '(' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}

// infra_delete - Function that delete the given infrastructure id
function infra_delete(infra_id) {
    $.ajax({
        url:  fg_info.apiserver_url + '/infrastructures/' + infra_id,
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "DELETE",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to delete infrastructure having id '
                     + infra_id + '(' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}

// app_list - Function that lists all available applications 
function app_list() {
    $.ajax({
        url:  fg_info.apiserver_url+'/applications',
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "GET",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to list applications (' + api_return_code + ')'
        };
        console.log("failed:" + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}

// app_create - Function that creates a new application using FG APIs
function app_create(app_json_data) {
    $.ajax({
        url:  fg_info.apiserver_url+'/applications',
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "POST",
        cache: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(app_json_data),
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to create infrastructure (' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}

// app_show - Function that shows the given application id
function app_show(app_id) {
    $.ajax({
        url:  fg_info.apiserver_url + '/applications/' + app_id,
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "GET",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to show infrastructure having id '
                     + infra_id + '(' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}

// app_delete - Function that delete the given application id
function app_delete(app_id) {
    $.ajax({
        url:  fg_info.apiserver_url + '/applications/' + app_id,
        headers: {
            "Authorization":"Bearer " + fg_info.token,
        },
        type: "DELETE",
        cache: false,
        dataType: "json",
        async: false
    }).fail(function(xhr, statusText, err) {
        api_return_code = xhr.status;
        api_result = {
            'message': 'Failed to delete infrastructure having id '
                     + infra_id + '(' + api_return_code + ')'
        };
        console.log('fail: ' + xhr.status + '-' + statusText + '-' + err );
    }).success(function(data, statusText, xhr) {
        api_return_code = xhr.status;
        api_result = data;
        console.log("success:" + api_return_code);
    });
}


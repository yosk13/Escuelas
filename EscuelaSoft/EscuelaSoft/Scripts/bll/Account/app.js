function ViewModel() {
   
    var l = $('.ladda-button').ladda();
    var self = this;  
    var tokenKey = 'accessToken';

    self.result = ko.observable();
    self.user = ko.observable();

    self.registerEmail = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPassword2 = ko.observable();

    self.loginEmail = ko.observable();
    self.loginPassword = ko.observable();
    self.errors = ko.observableArray([]);

    function showError(jqXHR) {
       
        self.result(jqXHR.status + ': ' + jqXHR.statusText);
        var response = jqXHR.responseJSON;

        console.log(response);

        if (response) {
            if (response.Message) self.errors.push(response.Message);
            if (response.ModelState) {
                var modelState = response.ModelState;
                for (var prop in modelState)
                {
                    if (modelState.hasOwnProperty(prop)) {
                        var msgArr = modelState[prop]; // expect array here
                        if (msgArr.length) {
                            for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
                        }
                    }
                }
            }
            if (response.error) self.errors.push(response.error);
            if (response.error_description) self.errors.push(response.error_description);
        }
    }

    self.callApi = function () {
        self.result('');
        self.errors.removeAll();

        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var url = 'https://localhost:44347/api/values';

        $.ajax({
            type: 'GET',
            url: url,
            headers: headers
        }).done(function (data) {
            self.result(data);
        }).fail(showError);
    }

    self.register = function () {
        self.result('');
        self.errors.removeAll();

        var data = {
            Email: self.registerEmail(),
            Password: self.registerPassword(),
            ConfirmPassword: self.registerPassword2()
        };
        
        var url = 'https://localhost:44347/api/Account/Register';       

        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            self.result("Done!");
        }).fail(showError);
    }

    self.login = function () {
        self.result('');
        self.errors.removeAll();

        var loginData = {
            grant_type: 'password',
            username: self.loginEmail(),
            password: self.loginPassword()
        };

        var i = 0;
        var correo = "";
        var password = "";
        var complemento = "";

        if (self.loginEmail() === undefined || self.loginEmail() === "") {
            correo = "Correo Electrónico";
            i = 1;           
        }

        if (self.loginPassword() === undefined || self.loginPassword() === "") {
            password = "Password";
            i = 2;
        }
        
        if (i > 0) {
            if (i > 0 && correo !== "" && password !== "") {
                complemento = " y ";
            }

            $("#Loginn").message("Favor de ingresar su " + correo + complemento + password, "warning", "Atención" || "");
            return;
        }       
        // Start button loading
            l.ladda('start');           
        
            var url = 'https://localhost:44347/Token';           

        $.ajax({
            type: 'POST',
            url: url,
            data: loginData
        }).done(function (data) {
            //console.log(data);
            self.user(data.userName);
            // Cache the access token in session storage.
            sessionStorage.setItem(tokenKey, data.access_token);
          
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('refreshToken', data.refresh_token);
           

            $("#Loginn").message("!Bienvenido a ZamSoft!", "success", "Hola");
            // Stop button loading
            l.ladda('stop');
           
            window.location.href = '/Home/Index';
          
        }).fail(function (response) {            
            var readyState = JSON.stringify(response.readyState);                    
            if (readyState != 0) {
                var error = JSON.parse(JSON.stringify(response.responseJSON.error_description));
                $("#Loginn").message(error, "error", "Error");
            } else {
                $("#Loginn").message("Lo sentimos, servicio no disponible, inténtelo mas tarde", "error", "Error");
            }
            // Stop button loading
            l.ladda('stop');
        });
    }

    self.logout = function () {
     
       // Log out from the cookie based logon.
        var token = sessionStorage.getItem(tokenKey);
      
        var header = {};
        if (token) {
            header.Authorization = 'Bearer ' + token;
        }
       
        //var url = 'https://localhost:44347/api/Account/Logout';
        var url = 'http://localhost:9031/api/Home/Logout';
      
        $.ajax({
            type: 'POST',            
            url: url,                       
            headers: header,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (jqXHR) {               
                jqXHR.setRequestHeader('Authorization', header);
                console.log("RESPUESTA AUTHORIZATION: ");
                console.log(JSON.stringify(jqXHR));

            },
        }).done(function (data) {           
            self.user('');
            sessionStorage.removeItem(headers);
            sessionStorage.removeItem(token);
            window.location.href = '/Account/Login';
        }).fail(function (response) {
            console.log("RESPUESTA FAIL: ");
            console.log(JSON.stringify(response));
        });
       
    }

    self.ChangePassword = function () {        
        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var url = 'https://localhost:44347/api/Account/ChangePassword';

        $.ajax({
            type: 'POST',
            url: url,
            headers: headers,
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader('Authorization', oauth.token_type + ' ' + oauth.access_token);
            }
        }).done(function (data) {
            // Successfully logged out. Delete the token.
            self.user('');
            sessionStorage.removeItem(tokenKey);
        }).fail(showError);
    }
}

var app = new ViewModel();
ko.applyBindings(app);
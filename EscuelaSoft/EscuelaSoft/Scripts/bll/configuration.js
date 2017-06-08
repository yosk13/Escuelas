var configuracionGlobal = {};

if (document.domain == 'zamsoft.com') { // Direcciones de producción    
    configuracionGlobal = {
        sUrlServidorUtil: window.location.protocol + '//util.cre.gob.mx',     
    }

} else if (document.domain == 'zamsoft.dev') { // Direcciones de desarrollo    
    configuracionGlobal = {
        sUrlServidorUtil: window.location.protocol + '//util.cre.gob.mx',
    }
}else { // Direcciones locales
    configuracionGlobal = {
        urlAccountLocalHost: window.location.protocol + '//localhost:30928',
    };
}

configuracionGlobal.protocolo = window.location.protocol;
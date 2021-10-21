require('dotenv').config()

module.exports = {
    msauth:{
        authUrl : process.env.MSAUTHURL,
		authData : {
			"grant_type": process.env.GRANTTYPE,
    		"client_id": process.env.CLIENTID + "@" + process.env.TENANTID,
			"client_secret": process.env.CLIENTSECRET,
			"resource": process.env.RESOURCE + "/" + process.env.DOMAIN + "@" + process.env.TENANTID
		},
        AuthOption : {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
	},
	quickbase : {
		TableID : process.env.TABLEID,
        FID : 6,
        QuickbaseBaseUrl : process.env.QUICKBASEAPIURL,
		QuickbaseQuery : process.env.QUICKBASEAPIURL + "/records/query",
		QuickbasePOST : process.env.QUICKBASEAPIURL + "/records",        
		QuickbaseOptions : {
			headers: {
				"QB-Realm-Hostname": "https://dfa.quickbase.com",
				"Authorization": "QB-USER-TOKEN " + process.env.USERTOKEN,
				"Content-Type": "application/json"
			}
		}
	},
	sharepoint:{
		contextUrl : "https://" + process.env.DOMAIN + "/sites/" + process.env.SITE + "/_api/contextinfo",
        domain : process.env.DOMAIN,
        uploadBaseUrl : "https://" + process.env.DOMAIN + "/sites/" + process.env.SITE + "/_api/Web/GetFolderByServerRelativeUrl('" + process.env.LIBRARY + "')"
	},
    server:{
        port: process.env.PORT
    }
}
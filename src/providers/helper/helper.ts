import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../config'
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";

@Injectable()
export class HelperProvider {

    
    constructor(public httpClient: HttpClient, private readonly storage: Storage,
        private readonly jwtHelper: JwtHelperService) {

    }

    getCalificaciones(matricula) {
        return  this.httpClient.get(`${SERVER_URL}/api/v1/calificaciones/alumnos/${matricula}`, { responseType: 'json', observe: 'response' }).map(
            response => {
                return response
            },
            error => {
                return {}
            }
        ) 
    }


}
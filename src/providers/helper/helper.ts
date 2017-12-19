import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../config'

@Injectable()
export class HelperProvider {


    constructor(public httpClient: HttpClient) {

    }

    getCalificaciones(matricula) {
        return this.httpClient.get(`${SERVER_URL}/api/v1/calificaciones/alumnos/${matricula}`, { responseType: 'json', observe: 'response' }).map(
            response => {
                return response
            },
            error => {
                return error
            }
        )
    }

    getPerfil(matricula) {
        return this.httpClient.get(`${SERVER_URL}/api/v1/alumnos/${matricula}`, {
            responseType: 'json', observe: 'response'
        }).map(
            response => {
                return response
            },
            error => {
                return error
            }
            )
    }

    cambiarContrasena(matricula, values) {
        return this.httpClient.put(`${SERVER_URL}/api/v1/contrasena/alumnos/${matricula}`, values, {
            responseType: 'json', observe: 'response'
        }).map(
            response => {
                return response
            },
            error => {
                return error
            }
            )
    }


}
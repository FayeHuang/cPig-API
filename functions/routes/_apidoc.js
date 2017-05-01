
/**
 * @apiDefine Header
 * 
 * @apiHeader {String} Authorization "Bearer ${Firebase ID Token}"
 * @apiHeader {String} Content-Type "application/json"
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkMzc2NmMzMzEyYjA4YTM2NTg2YjgzZWE0MTUxM2Y5NjlmNDZiY2UifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY3BpZy01YjE0OCIsIm5hbWUiOiLpu4PlsI_ngJ4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0xYXpTUkZLRzNjdy9BQUFBQUFBQUFBSS9BQUFBQUFBQUJKSS9LSEFMWndjVG85US9waG90by5qcGciLCJhdWQiOiJjcGlnLTViMTQ4IiwiYXV0aF90aW1lIjoxNDkzNjExMTQ0LCJ1c2VyX2lkIjoiMktLNzBxV1dVcE9GdVk5Ujl4RG5lTXlQalZZMiIsInN1YiI6IjJLSzcwcVdXVXBPRnVZOVI5eERuZU15UGpWWTIiLCJpYXQiOjE0OTM2MTExNDYsImV4cCI6MTQ5MzYxNDc0NiwiZW1haWwiOiJmYXllMTgyMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjQxOTgzMjMyOTA3NjExNjAzNyJdLCJlbWFpbCI6WyJmYXllMTgyMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.f9URkESDWnhy5mX2msU89rnXxGpiM5lZq9-W_6mwmkFaekMYR1bxALsY2VS7rSjwWNNKTInS-PFXIW-WRuE-5f6AzMgPFMD4wikGv5ZSaISz7DWNaHaoNK1bKVM10b_BxmsgMA3OAVRUJAs-bSgIu10I_g0UcoSdtTZNg5twkKR0ugeB69GLvgTPG_xC_jejDh_Jj0dlj8SMYwtQhSjRXS1eLq96_faUBdglvy-I7lJ2Qb_WXD6IlIOs-jIbztCgUtodq-9im4KlHuZw8OJ7KiMygTbh5c2gkFrWtlB0jQd0d99qxzaOcaMSHsVgKMvLsZq_vtW1FxM_Efrd_OIfcQ"
 *    "Content-Type": "application/json"
 *  }
 */

/**
 * @apiDefine Error
 *
 * @apiError Unauthorized [401] wrong id token
 * @apiError PermissionDenied [403] permission denied
 * @apiError NotFound [404] something not found
 * @apiError BadRequest [400] wrong parameters
 * @apiError InternalServerError [500] the server encountered an unexpected condition that prevented it from fulfilling the request
 *
 * @apiErrorExample Unauthorized:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "success": false,
 *    "message": "Unauthorized"
 *  }
 * 
 * @apiErrorExample PermissionDenied:
 *  HTTP/1.1 403 Forbidden
 *  {
 *    "success": false,
 *    "message": "Permission Denied"
 *  }
 * 
 * @apiErrorExample NotFound:
 *  HTTP/1.1 404 Not Found
 *  {
 *    "success": false,
 *    "message": "Not Found"
 *  }
 * 
 * @apiErrorExample BadRequest:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "success": false,
 *    "message": "Bad Request"
 *  }
 * 
 * @apiErrorExample InternalServerError:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "success": false,
 *    "message": "${error message}"
 *  }
 */
 
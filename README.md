# hyphae-startconnect

StartNG 2020 Final project.<br />

start-connect is a web app built to connect startNG finalist with prospective employers.<br />

API live link: <a>https://fast-meadow-93023.herokuapp.com/</a>
----
**Create accounts**
----
Register as an intern

* **URL**
    /intern/signup
* **Method:**
    `POST`

* **URL Params**
    none
* **URL Body** <br />
    **Required:**
    `internID = string`
    `email = string`
    `password = string`

* **Success Response:**
  * **code:** 200 <br />
    **content:** `{intern registered successfully}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `{"All fields are required" or "intern with email already exists}`


Register as an employer

* **URL**
    /employer/signup
* **Method:**
    `POST`

* **URL Params**
    none
* **URL Body** <br />
    **Required:**
    `employerName = string`
    `email = string`
    `password = string`

* **Success Response:**
  * **code:** 200 <br />
    **content:** `{Employer registered successfully}`
* **Error Response:**
  * **code:** 400 <br />
    **content:** `{"All fields are required" or "employer with email already exists}`


**Login users**
----
Login an intern

* **URL**
    /intern/login
* **Method:**
    `POST`

* **URL Params**
    none
* **URL Body** <br />
    **Required:**
    `internID = string`
    `email = string`
    `password = string`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `data:{message: "login successful", email: "intern email","token": "token"}`
* **Error Response:**
  * **code:** 403 Forbidden / 404 <br />
    **content:** `( 404: "User not found, please provide valid details". 403: "Incorrect password.")`

----
Login an employer

* **URL**
    /employer/login
* **Method:**
    `POST`

* **URL Params**
    none
* **URL Body** <br />
    **Required:**
    `email = string`
    `password = string`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `data: {message: "login successful", email: "employer email","token": "token"}`
* **Error Response:**
  * **code:** 403 Forbidden / 404 <br />
    **content:** `( 404: "Employer not found, please provide valid details". 403: "Incorrect password.")`

**Update profile**
----
Update intern profile

* **URL**
    /intern
* **Method:**
    `PATCH`

* **URL Params**
    none
* **URL Body** <br />
    **Required:**
    `email = intern email`
    `firstName = string`
    `lastName = string`
    `skill_sets = string, string, ...`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{message: "intern updated successfully", data: intern details}`
* **Error Response:**
  * **code:** 403 Forbidden <br />
    **content:** `(err message)`


**Post a job**
----
Post a job (only employers can post jobs)

* **URL**
    /job
* **Method:**
    `POST`
* **Headers:** <br />
    **Required:**
    `Authorization: Bearer "token"`
* **URL Body**
    **Required:**
    `job_title = string`
    `job_description = string`
    `role_focus = string` enum: Frontend/Backend/Full-stack
    `position_type = string` // enum: Full-time/Remote/Contract
    `skill_sets = string` e.g js, html, css
    `job_location = string`
    `job_status = string` enum: open/close
    `company_name = string`
    `company_website = string`
    `company_description = string`
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{message: "job successfully posted!", data: {job details}}`
* **Error Response:**
  * **code:** 401 Unauthorized/ 400/ 423<br />
    **content:** `401: {message: auth failed}, 400: {message: All necessary fields are required}, 423: {message: A job with title already exists}`


**Marketplace**
----
* **URL**
    /marketplace
* **Method:**
    `GET`
* **URL Header**
    none
* **Success Response:**
  * **code:** 200 <br />
    **content:** `{status: "success", data: [{interns: [], employers:[], jobs: []}] }`







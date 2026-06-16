const strings = {};

// ────────── AUTH ──────────
strings.UNAUTHORIZED = "Unauthorized: Please use /login to log in with your GitHub account";
strings.UNAUTHORIZED_OPERATION = "Unauthorized: Operation not permitted";



// ────────── Estimate ──────────
strings.ERROR_ADDING_ESTIMATE = "Error adding estimate";
strings.ESTIMATE_NOT_FOUND = "Estimate not found";
strings.ESTIMATE_SENT = "You have already sent an estimate for this project";
strings.PROJECT_NOT_AVAILABLE = "This project is not open for estimates"
strings.ERROR_GETTING_ESTIMATE = "Error getting estimate";
strings.ESTIMATE_UPDATED = "Estimate updated successfully";
strings.ESTIMATE_DELETED = "Estimate deleted successfully";
strings.ERROR_UPDATING_ESTIMATE = "Error updating estimate";
strings.ERROR_DELETING_ESTIMATE = "Error deleting estimate";
// ────────── PROJECT ──────────
strings.ERROR_ADDING_PROJECT = "Error adding project";
strings.ERROR_GETTING_PROJECT = "Error getting project";
strings.ERROR_GETTING_PROJECTS = "Error getting projects";
strings.ERROR_REMOVING_PROJECT = "Error removing this project";
strings.ERROR_UPDATING_PROJECT = "Error updating this project";
strings.PROJECT_DELETED = "Project deleted successfully";
strings.PROJECT_NOT_FOUND = "Project not found";
strings.PROJECT_UPDATED = "Project updated successfully";


// ────────── VALIDATION ──────────
strings.BAD_REQUEST = "Bad request";
strings.FIELD_REQUIRED = "Field required";
strings.TITLE_REQUIRED = "Title is required";
strings.DESCRIPTION_REQUIRED = "Description is required";
strings.CATEGORY_REQUIRED = "Category is required";
strings.INVALID_DATE = "Invalid date format  allowed: YYYY-MM-DD";
strings.BAD_SPECIALTY_ID = "Specialty ID malformed";
strings.EMAIL_BAD_FORMAT = "Invalid email format";
strings.EMAIL_NOT_EMPTY = "Username is required";
strings.BUDGET_NOT_EMPTY = "You must include a numeric budget";
strings.LONG_NAME_SPECIALTY = "Try a shorter name max: 40 characters";
strings.MALFORMED_ID = "ID malformed";
strings.NAME_NOT_EMPTY = "Name is required";
strings.PASSWORD_NOT_EMPTY = "Password is required";
strings.PASSWORD_SHORT = "Minimum password length is 5";
strings.PROJECT_NOT_EMPTY = "Add content for your project";
strings.NUMERIC_VALUE = "This field should be a number";
strings.NUMERIC_VALUE_RATE = "This field should be a number between 1-5";
strings.ERROR_ADDING_RATE = "Error adding rate";
strings.ERROR_GETTING_RATE = "Error getting rate";
strings.ERROR_UPDATING_RATE = "Error updating rate";
strings.ERROR_DELETING_RATE = "Error deleting rate";
strings.RATE_ADDED = "Rate added successfully";
strings.RATE_UPDATED = "Rate updated successfully";
strings.RATE_DELETED = "Rate deleted successfully";
strings.RATE_NOT_FOUND = "Rate not found";
strings.TOKEN_MALFORMED = "Token Malformed";
strings.NOT_AUTHENTICATED = "Not authenticated";

// ────────── Logging  ──────────
strings.ACCOUNT_NOT_FOUND = "Account not found"
strings.EXISTED_ACCOUNT = "You don't need to register, there is an account with this GitHub Id"
strings.PENDING_ACCOUNT = "Invalid account_id use /login to get a valid account_id"
strings.CREATE_ACCOUNT_MESSAGE = "use /contractor or /client to create an account"
strings.LOGGING_ERROR = "Login error"


// ────────── Contractor ──────────
strings.ERROR_ADDING_CONTRACTOR = "Error creating contractor";

// ────────── CLIENT ──────────
strings.ERROR_ADDING_CLIENT = "Error adding client";
strings.ERROR_GETTING_CLIENTS = "Error getting clients";
strings.ERROR_GETTING_CLIENT = "Error getting client";
strings.ERROR_UPDATING_CLIENT = "Error updating client";
strings.ERROR_DELETING_CLIENT = "Error deleting client";
strings.CLIENT_NOT_FOUND = "Client not found";
strings.CLIENT_UPDATED = "Client updated successfully";
strings.CLIENT_DELETED = "Client deleted successfully";
strings.CLIENT_EMAIL_EXISTS = "An account with this email already exists";
strings.EMAIL_REQUIRED = "Email is required";
strings.NAME_REQUIRED = "Name is required";
strings.PHONE_REQUIRED = "Phone is required";
strings.COMPANY_REQUIRED = "Company is required";

module.exports = strings;


import { faFire } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { Toast } from "bootstrap";
export const ApplicationForm = {
  namespaced: true,
  state: {
    applicationForm: {
      id: "",
      index: "",
      personalDetails: {
        id: "",
        applicant_id: "",
        title: "",
        gender: "",
        marital_status: "",
        date_of_birth: "",
        state_of_origin: "",
        place_of_birth: "",
        place_of_birth_LG: "",
        nationality: "",
        health_status: "",
        residential_address: "",
        contact_address: "",
        next_of_kin_name: "",
        next_of_kin_relationship: "",
        next_of_kin_email: "",
        next_of_kin_phone: "",
        next_of_kin_address: "",
        hobbies: "",
        picture: "",
        is_form_completed: "",
      },
      institutionDetails: [
        {
          address_of_institution: "",
          application_id: "",
          class_of_degree_obtained: "",
          created_at: "",
          date_admitted: "",
          date_graduated: "",
          field_discipline: "",
          id: "",
          institution_details: "",
          is_form_completed: "",
          name_of_institution: "",
          qualification_obtained: "",
          updated_at: "",
        },
      ],
      employmentHistory: [
        {
          address: "",
          application_id: "",
          end_date: "",
          id: "",
          is_form_complete: "",
          last_post_held: "",
          last_salary_per_annum: "",
          organisation: "",
          reason_for_leaving: "",
          start_date: "",
        },
      ],
      assestmentForm: {
        academic_distinction_prize: "",
        application_id: "",
        choose_campus: "",
        college_attending_currently: "",
        created_at: "",
        essay: "",
        id: "",
        is_form_completed: "",
        nysc_completed: "",
        programme_id: "",
        publications: "",
        relevant_info: "",
        updated_at: "",
      },
      reference: [
        {
          fullname: "",
          position: "",
          organisation: "",
          email: null,
          phone: null,
          title: null,
          // contactDetails: "",
          address: "",
        },
      ],
      credentials: {},
    },
    validator: {
      // personalDetails: [],
      // assessmentForm: [],
      // credentials: [],
      // employmentHistory: [],
      // institutionDetails: [],
      // reference: [],
    },
  },
  mutations: {
    setApplicationForm(state, formData) {
      state.applicationForm.id = formData.id;
      state.applicationForm.index = formData.index;
      state.applicationForm.personalDetails = formData.personaldetails;
      state.applicationForm.assestmentForm = formData.assessment;
      state.applicationForm.reference = formData.refree;
      state.applicationForm.employmentHistory = formData.employmenthistory;
      state.applicationForm.credentials = formData.credentials;
      state.applicationForm.institutionDetails = formData.institution;
      state.validator = {
        personalDetails: [],
        assessmentForm: [],
        credentials: [],
        employmentHistory: [],
        institutionDetails: [],
        reference: [],
      };
    },
    setPersonalDetails(state, data) {
      state.applicationForm.personalDetails = data;
    },
    setInstitutionDetails(state, data) {
      state.applicationForm.institutionDetails = data;
    },
    setEmploymentHistory(state, data) {
      state.applicationForm.employmentHistory = data;
    },
    setAssestmentForm(state, data) {
      state.applicationForm.assestmentForm = data;
    },
    setReference(state, data) {
      state.applicationForm.reference = data;
    },
    setCredentials(state, data) {
      state.applicationForm.credentials = data;
    },
    setValidator(state, data) {
      state.validator = data;
    },
  },
  actions: {
    savePersonalDetails(context, data) {
      context.commit("setPersonalDetails", data);
    },
    saveInstitutionDetails(context, data) {
      context.commit("setInstitutionDetails", data);
    },
    saveEmploymentHistory(context, data) {
      context.commit("setEmploymentHistory", data);
    },
    saveAssestmentForm(context, data) {
      context.commit("setAssestmentForm", data);
    },
    saveReference(context, data) {
      context.commit("setReference", data);
    },
    saveCredentials(context, data) {
      context.commit("setCredentials", data);
    },
    // saveValidator(context, data){
    //   context.commit("setValidator", data);
    // },
    saveApplicationForm(context) {
      //  console.log(context.rootState.applicationLists);
      //  context.dispatch("updateSingleApplication", context.state.applicationForm, {root:true})
      return new Promise((res, rej) => {
        axios
          .post("pgSaveApplicationForm", context.state.applicationForm)
          .then((response) => {
            if (response.data.msg == "success") {
              res(true);
            }
          })
          .catch((err) => {
            console.log(
              err + "Error saving the application form the  database"
            );
          });
      });
    },
    submitApplication(context) {
      return new Promise((res, rej) => {
        axios
          .post("submitApplication", context.state.applicationForm.id)
          .then((response) => {
            res(true);
          })
          .catch((err) => {
            console.log(err + "Error submitting application");
          });
      });
    },
    validateForm(context) {
      return new Promise((res, rej) => {
        axios
          .post("validateForm", {
            applicationForm: context.state.applicationForm,
            validator: context.state.validator,
          })
          .then((response) => {
            if(response.data.msg == 'fail'){
              Toast.fire({
                icon:'warning',
                title:response.data.value
              })
              context.commit("setValidator", response.data.validatorMsg);
              // console.log(response.data.validatorMsg)
              Fire.$emit('admissionValidator');
              res(false);
            }
            res(true);
          })
          .catch((err) => {
            rej()
          });
      });
    },
  },
  getters: {},
};

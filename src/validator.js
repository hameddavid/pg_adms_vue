import {extend} from 'vee-validate'
import {required, ext, email,} from 'vee-validate/dist/rules'


extend('required',{
    ...required,
    message: 'This field is required'
})

extend('email', {
    ...email,
    message: 'This field must be a valid email'
  });
  extend('positive', value=>{
    if (value >= 0){
        return true;
    }
    return 'This field must be a positive number';
});

extend('empty', value=> {
    console.log(value);
    var allowedExtensions = /(\.doc|\.docx|\.pdf|\.text|\.txt)$/i;
    
})
extend('min',{
    validate(value, args){
        if (value.length >= args.length) {
            return true
        }else{
            return 'It must be at least ' + args.length + ' characters'
        }
    },
    params:['length']
})
extend('mobile',{
    validate(value,args){
        if(value.length <= args.length){
            return true
        }else{
            return "Pls check your number "
        }
    },
    params:['length']
})
extend('takenEmail', value =>{
    return "This email is been used by another user "
})
extend('takenMobile',value=>{
    return "This mobile number is been used by another user"
})
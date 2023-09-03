setTimeout(() => {  
    console.log(formErrors)
    if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);  
          toast.error("Verifique todos os  campos");    
      }else{  
        const SUBMIT_INPUTS = {
          teacher_subject_teacher_code:INPUTS.teacher_subject_teacher_code, 
          teacher_subject_class:INPUTS.teacher_subject_class,
          teacher_subject_code:INPUTS.teacher_subject_code, 
        };


        const SUBMIT_INPUTS_TIMING = [
           {
            teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_1), 
            teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_1), 
          }, 
          {
            teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_2), 
            teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_2), 
          }, 
          {
            teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_3), 
            teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_3), 
          }, 
          {
            teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_4), 
            teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_4), 
          }, 
        ];

        if(!props.update){
          axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
            toast.success("Disciplina atribuida com sucesso !");

            setForm({});
            formErrors = {};
            ClearInputs();
            RefreshList(`.el-refresh-list`);

          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        } else {
          axios.put(FORMURL[2] , SUBMIT_INPUTS)
          .then(()=>{  
            toast.success("Atribuição atualizada com sucesso !"); 
            setForm({});
            ClearInputs();
            RefreshList(`.el-refresh-list`)

          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        } 
      }  
   }, 150);
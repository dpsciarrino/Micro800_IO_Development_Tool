var form = document.getElementById('form')
form.addEventListener('submit', function(e){
    e.preventDefault()

    url = '/micro800/update_controller_info/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({
            'part_number': form.controller.value
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        controller = data
        document.cookie = 'controller=' + JSON.stringify(controller) + ";domain=;path=/"
        window.location.reload()
    })
})

var di_generate_rungs_btn = document.getElementById('di-rungs-btn')
var di_generate_tags_btn = document.getElementById('di-tags-btn')
var di_form = document.getElementById('di-form')
di_generate_rungs_btn.addEventListener('click', function(e){
    e.preventDefault()

    di_info = {}

    // Number of Digital Inputs
    var di_num = parseInt(document.getElementById("di-number").innerHTML)
    di_info['number_of_digital_inputs'] = di_num

    // Simulation Tags
    var di_include_sims = document.getElementById("di_sim_tags").checked;

    for(var i = 0; i < di_num; i++){
        var di_str = "";
        var di_controller_tag = "";
        if(i < 10){
            di_str = "DI0" + i.toString()
            di_controller_tag = "_IO_EM_DI_0" + i.toString()
        }
        else{
            di_str = "DI" + i.toString()
            di_controller_tag = "_IO_EM_DI_" + i.toString()
        }
        var direct_inverse = "";
        var aux_tag = ""
        
        direct_inverse = di_str + "_direct"
        aux_tag = di_str + "_aux"

        var di_direct_inverse = document.getElementById(direct_inverse).value
        var di_aux = document.getElementById(aux_tag).value

        var contact_type = "XIC";
        if(di_direct_inverse == "Invert"){
            contact_type = "XIO";
        }

        var output_type = "OTE";
        if(di_aux == ''){
            output_type = "NOP"
        }
        else{
            output_type = "OTE"
        }

        var sim_tag = ""
        var di_ladder = ""
        if(di_include_sims == true){
            sim_tag = di_str + "_SIM"
            di_ladder = "BST " + contact_type + " " + di_controller_tag + " NXB " + contact_type + " " + sim_tag + " BND " + output_type + " " + di_aux;
        }
        else {
            di_ladder = contact_type + " " + di_controller_tag + " " + output_type + " " + di_aux
        }

        di_info[di_str] = {
            'direct':di_direct_inverse,
            'auxiliary_tag':di_aux,
            'simulation_tag':sim_tag,
            'ladder':di_ladder
        }
    }

    url = '/micro800/generate_di_ladder/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({
            'digital_inputs': di_info
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        ladder = data['ladder']
        document.getElementById('di_rungs_display').innerHTML = ladder
    })
})

function create_tag(name, datatype='BOOL', dimension='', stringsize='',initialvalue='',
direction='Var', attribute='ReadWrite',comment='',alias='',projectvalue=''){
    return {
        'Name':name,
        'DataType':datatype,
        'Dimension':dimension,
        'StringSize':stringsize,
        'InitialValue':initialvalue,
        'Direction':direction,
        'Attribute':attribute,
        'Comment':comment,
        'Alias':alias,
        'ProjectValue':projectvalue
    }
}

di_generate_tags_btn.addEventListener('click', function(e) {
    e.preventDefault()

    var di_info = {}
    var di_num = parseInt(document.getElementById("di-number").innerHTML)
    var di_include_sims = document.getElementById("di_sim_tags").checked

    di_info['number_of_digital_inputs'] = di_num
    di_info['include_simulation_tags'] = di_include_sims

    for(var i = 0; i < di_num; i++){
        var di_str = "";
        if(i < 10){
            di_str = "DI0" + i.toString()
        }
        else{
            di_str = "DI" + i.toString()
        }

        aux_tag_name = document.getElementById(di_str + "_aux").value
        aux_tag_comment = document.getElementById(di_str + "_aux_comment").value
        sim_tag_name = di_str + "_SIM"
        sim_tag_comment = "Simulation tag for " + aux_tag_name + "."
        di_info[di_str] = {
            'auxiliary_tag': create_tag(aux_tag_name,datatype='BOOL',dimension='', stringsize='',initialvalue='',direction='Var', attribute='ReadWrite',comment=aux_tag_comment,alias='',projectvalue=''),
            'simulation_tag': create_tag(sim_tag_name,datatype='BOOL',dimension='', stringsize='',initialvalue='',direction='Var', attribute='ReadWrite', comment=sim_tag_comment, alias='',projectvalue='')
        }
    }

    url = '/micro800/generate_di_tags/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({
            'digital_inputs': di_info
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        tags = data['tags']
        document.getElementById('di_tags_display').innerHTML = tags
    })

})












var do_generate_rungs_btn = document.getElementById('do-rungs-btn')
var do_generate_tags_btn = document.getElementById('do-tags-btn')
var do_form = document.getElementById('do-form')

do_generate_rungs_btn.addEventListener('click', function(e){
    e.preventDefault()

    do_info = {}

    // Number of Digital Inputs
    var do_num = parseInt(document.getElementById("do-number").innerHTML)
    do_info['number_of_digital_outputs'] = do_num

    // Simulation Tags
    var do_include_sims = document.getElementById("do_sim_tags").checked;

    for(var i = 0; i < do_num; i++){
        var do_str = "";
        var do_controller_tag = "";
        if(i < 10){
            do_str = "DO0" + i.toString()
            do_controller_tag = "_IO_EM_DO_0" + i.toString()
        }
        else{
            do_str = "DO" + i.toString()
            do_controller_tag = "_IO_EM_DO_" + i.toString()
        }
        var direct_inverse = "";
        var aux_tag = ""
        
        direct_inverse = do_str + "_direct"
        aux_tag = do_str + "_aux"

        var do_direct_inverse = document.getElementById(direct_inverse).value
        var do_aux = document.getElementById(aux_tag).value

        var contact_type = "XIC";
        if(do_direct_inverse == "Invert"){
            contact_type = "XIO";
        }

        // Auxiliary without simulation tag
        if(do_include_sims == false){
            if(do_aux != ''){
                do_ladder = contact_type + " " + do_aux + " OTE " + do_controller_tag
            } else {
                do_ladder = "AFI OTE " + do_controller_tag
            }
        } else {
            var sim_tag = ""
            sim_tag = do_str + "_SIM"
            if(do_aux != ''){
                do_ladder = "BST " + contact_type + " " + do_aux + " NXB " + contact_type + " " + sim_tag + " BND OTE " + do_controller_tag
            } else {
                do_ladder = "BST AFI NXB " + contact_type + " " + sim_tag + " BND OTE " + do_controller_tag
            }
        }

        do_info[do_str] = {
            'direct':do_direct_inverse,
            'auxiliary_tag':do_aux,
            'simulation_tag':sim_tag,
            'ladder':do_ladder
        }
    }

    url = '/micro800/generate_do_ladder/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({
            'digital_outputs': do_info
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        ladder = data['ladder']
        document.getElementById('do_rungs_display').innerHTML = ladder
    })
})







do_generate_tags_btn.addEventListener('click', function(e) {
    e.preventDefault()

    var do_info = {}
    var do_num = parseInt(document.getElementById("do-number").innerHTML)
    var do_include_sims = document.getElementById("do_sim_tags").checked

    do_info['number_of_digital_outputs'] = do_num
    do_info['include_simulation_tags'] = do_include_sims

    for(var i = 0; i < do_num; i++){
        var do_str = "";
        if(i < 10){
            do_str = "DO0" + i.toString()
        }
        else{
            do_str = "DO" + i.toString()
        }

        aux_tag_name = document.getElementById(do_str + "_aux").value
        aux_tag_comment = document.getElementById(do_str + "_aux_comment").value
        sim_tag_name = do_str + "_SIM"
        sim_tag_comment = "Simulation tag for " + aux_tag_name + "."
        do_info[do_str] = {
            'auxiliary_tag': create_tag(aux_tag_name,datatype='BOOL',dimension='', stringsize='',initialvalue='',direction='Var', attribute='ReadWrite',comment=aux_tag_comment,alias='',projectvalue=''),
            'simulation_tag': create_tag(sim_tag_name,datatype='BOOL',dimension='', stringsize='',initialvalue='',direction='Var', attribute='ReadWrite', comment=sim_tag_comment, alias='',projectvalue='')
        }
    }

    url = '/micro800/generate_do_tags/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({
            'digital_outputs': do_info
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        tags = data['tags']
        document.getElementById('do_tags_display').innerHTML = tags
    })

})
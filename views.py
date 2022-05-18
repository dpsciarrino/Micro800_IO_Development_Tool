from ipaddress import collapse_addresses
from django.http import JsonResponse
from django.shortcuts import render
import json
from .models import *
from .util import populate_database_with_controllers, tag_to_string

def home(request):
    # Controller Information from browser cookie
    controller_info = {}
    try:
        controller_info = json.loads(request.COOKIES['controller'])
    except KeyError:
        controller_info = {
            'product_line':'Micro810',
            'part_number':'2080-LC10-12AWA',
            'number_of_digital_inputs':8,
            'number_of_digital_outputs':4
        }
    
    # Used in Jinja template in numeric for loop iteration
    di_list = range(controller_info['number_of_digital_inputs'])
    do_list = range(controller_info['number_of_digital_outputs'])

    # Get list of controllers from database
    controller_objs = Controller.objects.all()
    controllers = []
    for c in controller_objs:
        controllers.append(c.part_number)

    # Setup the context for template
    context = controller_info
    context['di_list'] = di_list
    context['do_list'] = do_list
    context['controllers'] = controllers

    return render(request, 'micro800_io/index.html', context)

def update_controller_info(request):
    '''
    update_controller_info

    Endpoint for updating the current controller part number, number of DIs and DOs, etc.
    New controller-of-interest found in the body of the incoming request.
    '''
    body = json.loads(request.body)
    part_number = body['part_number']

    controller = Controller.objects.get(part_number=part_number)

    context = {
        'product_line':controller.product_line,
        'part_number': controller.part_number,
        'number_of_digital_inputs':controller.number_of_digital_inputs,
        'number_of_digital_outputs':controller.number_of_digital_outputs
    }

    return JsonResponse(context,safe=False)

def generate_di_ladder(request):
    '''
    generate_di_ladder

    List of digital input information found in body of request,
    generates the .txt string for creating the ladder logic program.
    '''
    body = json.loads(request.body)
    digital_inputs = body['digital_inputs']

    ladder_text = ""
    for key in digital_inputs.keys():
        if "DI" in key:
            ladder_text = ladder_text + digital_inputs[key]['ladder'] + "\n"

    context = {'ladder':ladder_text}
    return JsonResponse(context, safe=False)

def generate_di_tags(request):
    '''
    generate_di_tags

    Generates a list of tags in the format necessary to import into a 
    CCW application. Tested with v12 Connected Components Workbench.
    '''
    body = json.loads(request.body)
    digital_inputs = body['digital_inputs']
    include_sims = digital_inputs['include_simulation_tags']

    first_line = "Name,Data Type,Dimension,String Size,Initial Value,Direction,Attribute,Comment,Alias,Project Value,Version=2\n"
    second_line = "(Name),(DataType),(Dimension),(StringSize),(InitialValue),(Direction),(Attribute),(Comment),(Alias),(ProjectValue)\n"

    output_text = first_line + second_line

    for key in digital_inputs.keys():
        if "DI" in key:
            aux_tag = digital_inputs[key]['auxiliary_tag']
            if aux_tag['Name'] != '':
                output_text = output_text + tag_to_string(aux_tag)

            if include_sims != False:
                sim_tag = digital_inputs[key]['simulation_tag']
                output_text = output_text + tag_to_string(sim_tag)

    context = {'tags':output_text}
    return JsonResponse(context, safe=False)




def generate_do_ladder(request):
    '''
    generate_do_ladder

    Same as di, but with outputs
    '''
    body = json.loads(request.body)
    digital_outputs = body['digital_outputs']

    ladder_text = ""
    for key in digital_outputs.keys():
        if "DO" in key:
            ladder_text = ladder_text + digital_outputs[key]['ladder'] + "\n"

    context = {'ladder':ladder_text}
    return JsonResponse(context, safe=False)


def generate_do_tags(request):
    '''
    generate_do_tags

    Same as DI's, except with outputs
    '''
    body = json.loads(request.body)
    digital_outputs = body['digital_outputs']
    include_sims = digital_outputs['include_simulation_tags']

    first_line = "Name,Data Type,Dimension,String Size,Initial Value,Direction,Attribute,Comment,Alias,Project Value,Version=2\n"
    second_line = "(Name),(DataType),(Dimension),(StringSize),(InitialValue),(Direction),(Attribute),(Comment),(Alias),(ProjectValue)\n"

    output_text = first_line + second_line

    for key in digital_outputs.keys():
        if "DO" in key:
            aux_tag = digital_outputs[key]['auxiliary_tag']
            if aux_tag['Name'] != '':
                output_text = output_text + tag_to_string(aux_tag)

            if include_sims != False:
                sim_tag = digital_outputs[key]['simulation_tag']
                output_text = output_text + tag_to_string(sim_tag)

    context = {'tags':output_text}
    return JsonResponse(context, safe=False)


# Utility View
def insert_controllers(request):
    '''
    Populates the database with the appropriate controller part numbers
    and data.
    
    This is an initialization endpoint for the project.
    Should be deleted after first use.
    '''
    populate_database_with_controllers()
    context = {}
    return render(request, 'micro800_io/index.html', context)
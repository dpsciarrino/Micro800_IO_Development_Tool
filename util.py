from .models import Controller


micro810_controllers = [
    ["2080-LC10-12AWA", 8, 4],
    ["2080-LC10-12DWD", 8, 4],
    ["2080-LC10-12QBB", 8, 4],
    ["2080-LC10-12QWB", 8, 4]
]

micro820_controllers = [
    ["2080-LC20-20AWB", 8, 7],
    ["2080-LC20-20QBB", 12, 7],
    ["2080-LC20-20QWB", 12, 7]
]

micro830_controllers = [
    ["2080-LC30-10QVB",6,4],
    ["2080-LC30-10QWB",6,4],
    ["2080-LC30-16AWB",10,6],
    ["2080-LC30-16QVB",10,6],
    ["2080-LC30-16QWB",10,6],
    ["2080-LC30-24QBB",14,10],
    ["2080-LC30-24QVB",14,10],
    ["2080-LC30-24QWB",14,10],
    ["2080-LC30-48AWB",28,20]
]

micro850_controllers = [
    ["2080-LC50-24AWB", 14, 10],
    ["2080-LC50-24QBB", 14, 10],
    ["2080-LC50-24QVB", 14, 10],
    ["2080-LC50-24QWB", 14, 10],
    ["2080-LC50-48AWB", 28, 20],
    ["2080-LC50-48QBB", 28, 20],
    ["2080-LC50-48QVB", 28, 20],
    ["2080-LC50-48QWB", 28, 20],
    ["2080-LC50-48QWB-SIM", 28, 20]
]

def populate_database_with_controllers():
    '''
    Populates the database with controller information.
    '''
    # Micro810 Controllers
    for c in micro810_controllers:
        m = Controller(
                product_line="Micro810", 
                part_number=c[0],
                number_of_digital_inputs=c[1],
                number_of_digital_outputs=c[2]
            )
        
        m.save()
    
    # # Micro820 Controllers
    for c in micro820_controllers:
        m = Controller(
                product_line="Micro820", 
                part_number=c[0],
                number_of_digital_inputs=c[1],
                number_of_digital_outputs=c[2]
            )
        
        m.save()
    
    # Micro830 Controllers
    for c in micro830_controllers:
        m = Controller(
                product_line="Micro830", 
                part_number=c[0],
                number_of_digital_inputs=c[1],
                number_of_digital_outputs=c[2]
            )
        
        m.save()
    
    # Micro850 Controllers
    for c in micro850_controllers:
        m = Controller(
                product_line="Micro850", 
                part_number=c[0],
                number_of_digital_inputs=c[1],
                number_of_digital_outputs=c[2]
            )
        
        m.save()

def tag_to_string(tag:dict):
    '''
    The tag as a dictionary is converted into a comma-separated string representation.
    '''
    result = ""
    for key in tag.keys():
        result = result + tag[key] + ","
    
    result = result[:-1] + "\n"
    return result

    #return tag['Name'] + "," + tag['DataType'] + "," + tag['Dimension'] + "," + tag['StringSize'] + "," + tag['InitialValue'] + "," + tag['Direction'] + "," + tag['Attribute'] + "," + tag['Comment'] + "," + tag['Alias'] + "," + tag['ProjectValue'] + "\n"


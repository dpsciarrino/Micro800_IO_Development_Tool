from django.db import models

class Controller(models.Model):
    # Controller Product Line
    product_line = models.CharField(max_length=20)

    # Controller Part Number
    part_number = models.CharField(max_length=50)

    # Number of Digital Inputs
    number_of_digital_inputs = models.IntegerField(default=0)

    # Number of Digital Outputs
    number_of_digital_outputs = models.IntegerField(default=0)

    def __str__(self):
        return self.part_number


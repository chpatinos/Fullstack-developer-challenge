import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import swal from 'sweetalert2/dist/sweetalert2.min.js';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styles: []
})

export class PersonComponent implements OnInit {

  submitted: Boolean = false;

  personForm: FormGroup;
  persons: Person[]

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) { }

  get f() { return this.personForm.controls }

  ngOnInit() {
    this.personService.getAllPersons().subscribe(resp => {
      if (resp && resp.status === "success") this.persons = resp.data
      else {
        swal.close();
        swal.fire(
          "Persons",
          'Error getting the information',
          "error"
        );
        console.log(resp.message);
      }
    }, error => {
      swal.close();
      swal.fire(
        "Persons",
        'Error getting the information',
        "error"
      );
      console.log(error);
    });

    this.personForm = this.formBuilder.group({
      cc: [null, Validators.required],
      fullname: ['', Validators.required],
      birth: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.personForm.invalid) return;

    let person: Person = this.personForm.value;
    swal.fire({
      title: 'Creating Person...',
    });
    swal.showLoading();

    this.personService.createPerson(person).subscribe(resp => {
      swal.close();

      if (resp && resp.status === "success") {
        this.submitted = false;
        this.resetForm();
        this.closeModal();
        this.refreshPersons();
        swal.fire('Person', 'Person created successfully', 'success');
      }
      else {
        swal.fire(
          "Person",
          'Error creating person, please try again later.',
          "error"
        );
      }
    }, error => {
      swal.close();
      if (error.error.error.name === "SequelizeUniqueConstraintError") {
        swal.fire('Person', 'This person already exist in system. Try with another CC person', 'warning');
      }
      else {
        swal.fire(
          "Person",
          'Error creating person, please try again later.',
          "error"
        );
      }

      console.log(error);
    })
  }

  private refreshPersons(): void {
    this.personService.getAllPersons().subscribe(resp => {
      if (resp && resp.status === "success") this.persons = resp.data
      else {
        swal.close();
        swal.fire(
          "Persons",
          'Error getting the information',
          "error"
        );
        console.log(resp.message);
      }
    }, error => {
      swal.close();
      swal.fire(
        "Persons",
        'Error getting the information',
        "error"
      );
      console.log(error);
    });
  }

  private resetForm() {
    this.personForm = this.formBuilder.group({
      cc: [null, Validators.required],
      fullname: ['', Validators.required],
      birth: ['', Validators.required]
    })
  }

  private closeModal() {
    document.getElementById("close-modal").click();
  }

}
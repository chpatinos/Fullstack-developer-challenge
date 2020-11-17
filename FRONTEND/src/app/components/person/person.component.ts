import { PersonService } from 'src/app/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2/src/sweetalert2.js';

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
      console.log(error.error.error.name === "SequelizeUniqueConstraintError");
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

  private closeModal() {
    document.getElementsByClassName("modal-backdrop")[0].remove();
    document.getElementById("createPersonModal").style.display = "none";
    document.getElementById("createPersonModal").classList.remove("show");
    document.getElementsByTagName("body")[0].classList.remove("modal-open");
  }

}
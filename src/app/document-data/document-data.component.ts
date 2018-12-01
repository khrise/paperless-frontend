import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-data',
  templateUrl: './document-data.component.html',
  styleUrls: ['./document-data.component.scss']
})
export class DocumentDataComponent implements OnInit {

  @Input() doc: Document

  form:FormGroup

  editing: boolean = false

  editedField: {name: string, control: any};
  oldVal: any

  constructor(private fb: FormBuilder,
    private service: DocumentService) {
  }

  enableEdit = () => {
    this.editing = true;
    this.form = this.fb.group({
      'title': this.doc.title
    });
  }

  edit = (field: string, elem) => {
    let e = elem
    elem.disabled = false;
    this.editedField = { name: field, control: elem};
    this.oldVal = elem.value;
    elem.focus();
  }

  saveEdit = (field: string, elem) => {
    // naive deep copy the original document
    let body = JSON.parse(JSON.stringify(this.doc));
    // alter the field we just edited
    body[field] = elem.value;
    // and, shoot.
    this.service.update(this.doc.id, body).subscribe(
      (result) => {
        if (result) {
          this.disableEdit()
        }
      }
    )
  }

  cancelEdit = (field: string, elem) => {
    elem.value = this.oldVal;
    this.disableEdit();
  }

  disableEdit = () => {
    this.editedField.control.disabled = true;
    this.editedField = null;
    this.oldVal = null
  }

  ngOnInit() {
    
  }

}

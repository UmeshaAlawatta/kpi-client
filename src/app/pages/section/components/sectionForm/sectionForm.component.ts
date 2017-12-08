import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SectionService } from '../../section.service';
import { WorkCenterService } from '../../../workCenter/workCenter.service';
import { SectionTypeService } from '../../../sectionType/sectionType.service';

@Component({
    selector: 'section-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sectionForm.scss'],
    templateUrl: './sectionForm.html'
})
export class SectionForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    section: any = {};
    subscription: Subscription;
    sectionType: any;

    constructor(protected service: SectionService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private sectionTypeService: SectionTypeService,
        private workCenterService: WorkCenterService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            mtbfTarget: [''],
            mttrTarget: [''],
            mdtTarget: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.section = data;
        }
        this.formGroup.patchValue(this.section, { onlySelf: true });
        this.sectionType = this.section.sectionType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/section/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}

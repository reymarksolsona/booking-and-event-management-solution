import { Component, OnInit } from '@angular/core';
import { childProfile, Profile } from '../../shared/model/model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userIsLoggedIn: Boolean = false;
  currentUser: Profile | childProfile | null = null;
  selectedProfile: Profile| childProfile | null = null;
  selectedProfileWithChanges: Profile | null = null;

  ngOnInit(): void {

    this.selectedProfile = {
      parentContactId: '',
      contactid: '',
      _xre_title_value: '',
      firstname: '',
      middlename: null,
      lastname: '',
      yomifirstname: null,
      birthdate: '',
      xre_age: '',
      xre_gender: null,
      xre_pronouns: null,
      xre_religiousaffiliation: null,
      xre_aboriginaltorresstraitislander: null,
      xre_languagesspoken: null,
      xre_occupation: null,
      jobtitle: null,
      xre_gendertext: null,
      telephone1: null,
      telephone2: null,
      telephone3: null,
      xre_phonealternative: null,
      emailaddress1: '',
      emailaddress2: null,
      emailaddress3: null,
      xre_agegroup: null,
      address1_line1: null,
      address1_line2: null,
      address1_city: null,
      xre_residentialaddressstate: null,
      xre_residentialaddressotherstate: null,
      address1_postalcode: null,
      _xre_residentialaddresscountry_value: null,
      xre_sameasresidentialaddress: false,
      address2_line1: null,
      address2_line2: null,
      address2_city: null,
      xre_postaladdressotherstate: null,
      address2_postalcode: null,
      xre_branch: 0,
      xre_memberid: null,
      imageUrl: ''
    }
  }
}

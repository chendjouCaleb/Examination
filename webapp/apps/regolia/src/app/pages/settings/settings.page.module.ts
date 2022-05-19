import {NgModule} from "@angular/core";
import {
  MsButtonModule, MsCheckboxModule,
  MsCleaveModule,
  MsFormFieldModule,
  MsLabelModule,
  MsRadioModule,
  MsRibbonModule
} from "@ms-fluent/components";
import {CommonModule} from "@angular/common";
import {UserSettingsPageLayout} from "./layout/UserSettingsPageLayout";
import {SettingsProfilePage} from "./profile/settings-profile.page";
import {RouterModule, Routes} from "@angular/router";
import {LayoutModule} from "examination/infrastructure";
import {UserChangePasswordPage} from "./password/UserChangePassword.page";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule, ImageCropperModule} from "src/controls";
import {UserSettingsImage} from "./profile/image/user-settings-image";

const routes: Routes = [
  {
    path: '', component: UserSettingsPageLayout, children: [
      {path: 'profile', component: SettingsProfilePage, data: {label: 'profile'}},
      {path: 'password', component: UserChangePasswordPage, data: {label: 'password'}},
      {path: '', redirectTo: 'profile', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [CommonModule, MsRibbonModule, MsButtonModule, RouterModule.forChild(routes),
    LayoutModule, ReactiveFormsModule, MsFormFieldModule, AppFormModule, MsCleaveModule,
    MsRadioModule, MsLabelModule, MsCheckboxModule, ImageCropperModule],
  declarations: [UserSettingsPageLayout, SettingsProfilePage, UserChangePasswordPage, UserSettingsImage]
})
export class UserSettingsPageModule {

}

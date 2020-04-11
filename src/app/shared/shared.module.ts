import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ImagePickerComponent } from "./image-picker/image-picker.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [ImagePickerComponent],
  declarations: [ImagePickerComponent],
})
export class SharedModule {}

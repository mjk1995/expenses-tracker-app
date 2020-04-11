import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imageData = new EventEmitter<{imagePick: string | File, timeStamp: Date}>();
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Input() showPreview = false;
  selectedImage: string | File;
  usePicker = false;
  timeStamp: Date;

  constructor(private platform: Platform) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      saveToGallery: true,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.DataUrl
    }).then(image => {
      this.timeStamp = new Date(Date.now());
      this.selectedImage = image.dataUrl;
      this.imageData.emit({imagePick: this.selectedImage, timeStamp: this.timeStamp});
    }).catch(error => {
      console.log(error);
      if (this.usePicker) {
        this.filePickerRef.nativeElement.click();
      }
      return false;
    });
    this.showPreview = true;
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.timeStamp = new Date(Date.now());
      this.imageData.emit({imagePick: this.selectedImage, timeStamp: this.timeStamp});
    }
    fr.readAsDataURL(pickedFile);
  }

}
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  protected imageSource = signal<string | ArrayBuffer | null | undefined>(null);
  protected isDragging = false;
  private fileToUpload: File | null = null;
  uploadFile = output<File>();
  loading = input<boolean>(false);

  onDragOver(event: DragEvent) {
    this.onDrag(event, true);
  }

  onDragLeave(event: DragEvent) {
    this.onDrag(event, false);
  }

  onDrop(event: DragEvent) {
    this.onDrag(event, false);

    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  onUploadFile() {
    if (this.fileToUpload) {
      this.uploadFile.emit(this.fileToUpload);
    }
  }

  onCancelUpload() {
    this.fileToUpload = null;
    this.imageSource.set(null);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  private onDrag(event: DragEvent, val: boolean) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = val;
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageSource.set(e.target?.result);
    reader.readAsDataURL(file);
  }
}

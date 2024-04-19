import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'task';

  ngOnInit(): void {
    this.showCustomAlert();
  }

  async showCustomAlert() {
    try {
      const result = await Swal.fire({
        title: 'Custom UI Example',
        html: `
          <div style="text-align: center;">
            <h3>This is a custom SweetAlert2 modal!</h3>
            <p>You can add any HTML content here.</p>
            <button id="custom-button" class="btn">Custom Button</button>
          </div>
        `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          // Perform actions when the Confirm button is clicked
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        Swal.fire('Confirmed', 'Your action has been confirmed.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled.', 'error');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}

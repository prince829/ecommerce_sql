$(function () {
  $(document).on('click', '.userStatusUpdate', function () {
    var elemID = $(this).data('id');
    swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            window.location.href = `${window.location.protocol}//${window.location.host}/user/change-status/${elemID}`;
        }
    });
  });
});

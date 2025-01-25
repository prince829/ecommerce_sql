$(function () {
  ('use strict');

  var basUrl = $("#basUrl").val();
  var dtUserTable = $('.user-list-table'),
    select = $('.select2'),
    statusObj = {
      'Active': { title: 'Active', class: 'badge-light-success' },
      'Inactive': { title: 'Inactive', class: 'badge-light-secondary' }
    };

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.on('processing.dt', function () {
      let times = $('.calc-time-diff');
      if (times.length) {
        times.each(function () {
          let currentHTML = $(this).html();
          if (currentHTML) {
            let hasUpdated = /updated/i.test(currentHTML);
            let shownTime = currentHTML.replace('Updated', '').trim();
            let oldtime = new Date(moment(shownTime, 'dddd, Do of MMMM, YYYY - hh:mm A (Z)').format());
            calcTime($(this), oldtime, hasUpdated);
          }
        });
      }
    }).DataTable({
      paging: true,
      sorting: true,
      serverSide: true,
      processing: true,
      orderMulti: false,
      ajax: {
        url: `${window.location.protocol}//${window.location.host}/user/getall`,
        method: 'post',
        dataFilter: function (data) {
          var json = JSON.parse(data);
          json.recordsTotal = json.data.recordsTotal;
          json.recordsFiltered = json.data.recordsFiltered;
          json.data = json.data.data;
          console.log(data);
          return JSON.stringify(json);
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },
        { data: '_id' },
        { data: 'full_name' },
        { data: 'createdAt' },
        { data: 'status' },
        { data: 'full_name' },
        { data: 'email' },
        { data: 'phone' },
        { data: 'userRole' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          responsivePriority: 3,
          sortable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check"> <input class="form-check-input dt-checkboxes onecheck" type="checkbox" value="' + full['_id'] + '" id="checkbox_' +
              full['_id'] +
              '" /><label class="form-check-label" for="checkbox' +
              full['_id'] +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
          }
        },
        {
          // User full name and username
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            // console.log(full,'full');
            var $name = full['full_name'],
              $email = full['email'],
              $contact = full['phone'],
              $image = full['profile_image'];
            if ($image && $image != "no-image.png") {

              var $output =
                '<img src="/uploads/profile_pic/' + $image + '" alt="Avatar" height="32" width="32">';


            } else {
              var $output =
                '<img src="/uploads/no-image.png" alt="Avatar" height="32" width="32">';

            }
            var colorClass = $image === '' ? ' bg-light-' + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1" style="cursor: default !important;">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' + window.location.protocol + '//' + window.location.host + '/user/view/' + full["_id"] + '" class="user_name text-truncate text-body"><span class="fw-bolder" >' +
              $name +
              '</span></a>' +
              '<small class="emp_post text-muted" style="color: gray !important">' +
              $email +
              '</small>' +
              ($contact ?
                '<small class="emp_post text-muted" style="color: gray !important">' +
                $contact +
                '</small>' : '') +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Joined On
          targets: 3,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<small class="emp_post">' +
              moment(full['createdAt']).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)') +
              '</small>'
            );
          }
        },
        {
          // User Status
          targets: 4,
          orderable: false,
          searchable: true,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return (
              '<span class="badge rounded-pill userStatusUpdate cursor-pointer ' +
              statusObj[$status].class +
              '" text-capitalized data-status="' + $status + '" data-id="' + full['_id'] + '">' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          targets: 5,
          title: 'Full Name',
          visible: false,
          sortable: false,
          render: function (data, type, full, meta) {
            if (full['full_name']) {
              return full['full_name'];
            } else {
              return 'N/A'
            }
          }
        },
        {
          targets: 6,
          title: 'Email',
          visible: false,
          sortable: false,
          render: function (data, type, full, meta) {
            if (full['email']) {
              return full['email'];
            } else {
              return 'N/A'
            }
          }
        },
        {
          targets: 7,
          title: 'Phone',
          visible: false,
          sortable: false,
          render: function (data, type, full, meta) {
            if (full['phone']) {
              return full['phone'];
            } else {
              return 'N/A'
            }
          }
        },
        {
          targets: 8,
          title: 'Role',
          visible: false,
          sortable: false,
          render: function (data, type, full, meta) {
            if (full['role']) {
              return full['role'];
            } else {
              return 'N/A'
            }
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' + window.location.protocol + '//' + window.location.host + '/user/view/' + full["_id"] + '" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Details</a>' +
              '<a href="javascript:;" id="del-' + full["_id"] + '" class="dropdown-item delete-record deleteUser">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'asc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..',
        "zeroRecords": "No data Found",
        "processing": 'Loading',
        paginate: {
          // remove previous & next text from pagination
          // previous: '&nbsp;',
          // next: '&nbsp;'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          autoClose: true,
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: 'Bulk Action',
          buttons: [
            {
              text: feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) + 'Delete',
              className: 'dropdown-item deleteBtn',
            },
          ]
        },
        {
          extend: 'collection',
          autoClose: true,
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        },
        // Add New Button
        {
          text: 'Add New User',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#modals-slide-in'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIdx +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                '<td>' +
                col.title +
                ':' +
                '</td> ' +
                '<td>' +
                col.data +
                '</td>' +
                '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      initComplete: function (e) {
        // Adding status filter once table initialized

        this.api()
          .columns(8)
          .every(function () {
            let column = this;
            $('#roleDropDown').select2();
            $('#roleDropDown').ready(function () {
              let val = $.fn.dataTable.util.escapeRegex($('#roleDropDown').val());
              if (val && val != "") {
                column.search(val ? val : '', false, false).draw();
              }

            });
            $('#roleDropDown').on('change', function () {
              let val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? val : '', false, false).draw();
            });
          });




        this.api()
          .columns(4)
          .every(function () {
            let column = this;
            $('#StatusDropdown').select2();
            $('#StatusDropdown').ready(function () {
              let val = $.fn.dataTable.util.escapeRegex($('#StatusDropdown').val());
              if (val && val != "") {
                column.search(val ? val : '', false, false).draw();
              }
            });
            $('#StatusDropdown').on('change', function () {
              let val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? val : '', false, false).draw();
            });
          });

      }
    });
  }


  $(document).on('click', '.add-new', function () {
    document.getElementById("add-new-user").reset();
  });


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

  $(document).on('click', '.deleteUser', function () {
    var elemID = $(this).attr('id').replace('del-', '');
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${location.protocol}//${window.location.host}/user/delete/${elemID}`;
      }
    });
  });

  $(document).on('click', '#checkboxSelectAll', function () {
    let allcheck = $('#checkboxSelectAll').is(":checked");
    if (allcheck == true) {
      $('.onecheck').prop('checked', true);
    } else {
      $('.onecheck').prop('checked', false);
    }
  });
  $(document).on("click", ".onecheck", function () {
    let singleCheck = $(this).is(":checked");

    if (singleCheck == false) {
      $('#checkboxSelectAll').prop('checked', false);
    }
  })


  $(document).on('click', '.deleteBtn', function () {
    var deleteArr = [];
    $('.onecheck:checkbox:checked').each(function () {
      deleteArr.push(($(this).val()));
    });
    if (deleteArr.length == 0) {
      alert("There is no any data selected")
    } else {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(function (result) {
        if (result.value) {
          var body = { id: deleteArr };
          $.ajax({
            url: `${location.protocol}//${window.location.host}/user/delete/bulk`,
            type: "POST",
            data: JSON.stringify(body),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
              if (response.status == 200) {
                window.location.reload();
              }
            }
          });
        }
      });
    }
  });
});


function calcTime(item, time, hasUpdated) {
  if (moment(time).isSameOrBefore(moment().subtract(23, 'hours'))) {
    if (hasUpdated) {
      $(item).html(`Updated ${moment(time).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)')}`);
    } else {
      $(item).html(`${moment(time).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)')}`);
    }
  } else {
    setInterval(function () {
      if (hasUpdated) {
        $(item).html(`Updated ${moment(time).fromNow()}`);
      } else {
        $(item).html(`${moment(time).fromNow()}`);
      }
    }, 1000);
  }

}
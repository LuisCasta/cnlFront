"use strict";
async function loadRateByStudent() {
  const rateByStudent = await getAllRatesByUnit(idUnit);

  if (rateByStudent.code != 200) {
    console.log(`Error ${rateByStudent.message}`);
  } else {
    rateByStudent.data.forEach((rateStudent) => {
      const { pond_activities } = rateStudent;
      // console.log(rateStudent);
    });
  }
}

loadRateByStudent();

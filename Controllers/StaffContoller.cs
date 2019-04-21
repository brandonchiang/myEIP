using System.Collections.Generic;
using System.Linq;
using myEIPWebAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace myEIPWebAPI.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase {
        private readonly EIPContext _context;

        public StaffController (EIPContext context) {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Staff>> Get () {
            using (var context = _context) {
                var result = from d in context.EIP_STAFF.AsEnumerable()
                where d.CLOSE_YN!="Y"
                select new Staff {
                    EMP_ID = d.EMP_ID,
                    EMP_NAME = d.EMP_NAME,
                    VOUCHER_REMARK = d.VOUCHER_REMARK,
                    CORP_EMAIL = d.CORP_EMAIL
                };
                return result.ToList();
            }
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public ActionResult<Staff> Get (string id) {
            using (var context = _context) {
                return context.EIP_STAFF.SingleOrDefault (b => b.EMP_ID == id);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}
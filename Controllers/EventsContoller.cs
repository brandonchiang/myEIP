using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using myEIPWebAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace myEIPWebAPI.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase {
        private readonly EIPContext _context;

        public EventsController (EIPContext context) {
            _context = context;
        }

        //GET api/values
        [HttpGet("top100")]
        public ActionResult<IEnumerable<Events>> Get () {
            using (var context = _context) {
                return context.EIP_EVENTS.OrderByDescending (x => x.DATA_SEQ).Take (100).ToList ();
            }
        }

        // GET api/values
        [HttpGet()]
        public ActionResult<IEnumerable<Events>> Get (
            [FromQuery] string startDate ,
            [FromQuery] string endDate ,
            [FromQuery] string keyword 
            ) {
            //string startDate, string endDate, string keyword
            // string startDate, string endDate, string keyword
            var v1 = DateTime.TryParse (startDate, out DateTime d1);
            var v2 = DateTime.TryParse (endDate, out DateTime d2);
            if (!v1) return null;
            if (!v2) return null;

            var d0 = string.Format("{0:yyyy/MM/dd}", d1);
            var d9 = string.Format("{0:yyyy/MM/dd}", d2);

            //用 .date 會產生  (CONVERT(date, [e].[WORK_DATE]) >= '2018-01-01T00:00:00.0000000') 這樣的SQL指令
            var whereClause = "WORK_DATE.date >= @0 && WORK_DATE.date <= @1";
            if(!string.IsNullOrWhiteSpace(keyword)) whereClause += " && (EMP_NAME.Contains (@2) || WORK_DESC.Contains (@2))";

            using (var context = _context) {
                return context.EIP_EVENTS
                    .Where(whereClause,d1,d2,keyword)
                    .OrderBy(x=>x.DATA_SEQ)
                    .ToList ();
            }
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public ActionResult<Events> Get (int id) {
            using (var context = _context) {
                return context.EIP_EVENTS.SingleOrDefault (b => b.DATA_SEQ == id);
            }
        }

        // POST api/values //新增
        [HttpPost]
        public ActionResult<Events> Post ([FromBody] Events events) {
            using (var context = _context) {
                events.WORK_DATE = events.WORK_DATE.ToLocalTime();
                context.EIP_EVENTS.Add (events);
                context.SaveChanges ();
                return Get (events.DATA_SEQ);
            }
        }

        // PUT api //修改
        [HttpPut]
        public ActionResult<Events> Put ([FromBody] Events events) {
            using (var context = _context) {
                var oriEvents = context.EIP_EVENTS.SingleOrDefault (c => c.DATA_SEQ == events.DATA_SEQ);
                if (oriEvents != null) {
                    context.Entry (oriEvents).CurrentValues.SetValues (events);
                    context.SaveChanges ();
                    return Ok ();
                }
                return BadRequest ();
            }
        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) {
            using (var context = _context) 
            {
                var events = new Events { DATA_SEQ = id};
                context.Entry(events).State = EntityState.Deleted;
                context.SaveChanges();
            }
        }
    }
}
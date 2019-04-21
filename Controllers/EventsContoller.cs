using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using myEIPWebAPI.Model;

namespace myEIPWebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EIPContext _context;

        public EventsController(EIPContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Events>> Get()
        {
            using (var context = _context)
            {
                return context.EIP_EVENTS.ToList();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Events> Get(int id)
        {
            using (var context = _context)
            {
                return context.EIP_EVENTS.SingleOrDefault(b=>b.DATA_SEQ==id);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

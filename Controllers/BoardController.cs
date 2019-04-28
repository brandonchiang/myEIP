using System.Collections.Generic;
using System.Linq;
using myEIPWebAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace myEIPWebAPI.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase {
        private readonly EIPContext _context;

        public BoardController (EIPContext context) {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Board>> Get () {
            using (var context = _context) {
                return context.EIP_BOARD.ToList ();
            }
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public ActionResult<Board> Get (int id) {
            using (var context = _context) {
                return context.EIP_BOARD.SingleOrDefault (b => b.DATA_SEQ == id);
            }
        }

        // POST api/values //新增
        [HttpPost]
        public ActionResult<Board> Post ([FromBody] Board board) {
            using (var context = _context) {
                context.EIP_BOARD.Add (board);
                context.SaveChanges ();
                return Get (board.DATA_SEQ);
            }
        }

        // PUT api //修改
        [HttpPut]
        public ActionResult<Board> Put ([FromBody] Board board) {
            using (var context = _context) {
                var oriBoard = context.EIP_BOARD.SingleOrDefault (c => c.DATA_SEQ == board.DATA_SEQ);
                if (oriBoard != null) {
                    context.Entry (oriBoard).CurrentValues.SetValues (board);
                    context.SaveChanges ();
                    return Ok ();
                }
                return BadRequest ();
            }
        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) {
            using (var context = _context) {
                var board = new Board { DATA_SEQ = id };
                context.Entry (board).State = EntityState.Deleted;
                context.SaveChanges ();
            }
        }
    }
}
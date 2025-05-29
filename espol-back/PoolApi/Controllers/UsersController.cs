using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public UsersController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config;
    }
    
    [HttpGet("all")]
    public async Task<IActionResult> getAllUsers()
    {
        var usuarios = await _context.Usuarios.Select(
            u=> new UsuarioDto
            {
                Id=u.Id,
                Name = u.Name,
                Email = u.Email,
                Username = u.Username,
                Role = u.Role
            }
            ).ToListAsync();
        return Ok(usuarios);
    }
    
    [HttpGet("getUser/{id}")]
    public async Task<IActionResult> getUser(int id)
    {
        var usuario = await _context.Usuarios
            .Where(u => u.Id == id)
            .Select(u => new UsuarioDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Username = u.Username,
                Role = u.Role
            })
            .FirstOrDefaultAsync();

        if (usuario == null)
        {
            return NotFound();
        }
        return Ok(usuario);
    }
    
    [HttpPut("updateUser/{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UsuarioDto usuarioDto)
    {
        if (id != usuarioDto.Id)
        {
            return BadRequest("El id de la URL no coincide con el id del cuerpo.");
        }

        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }

        usuario.Name = usuarioDto.Name;
        usuario.Email = usuarioDto.Email;
        usuario.Username = usuarioDto.Username;
        usuario.Role = usuarioDto.Role;

        await _context.SaveChangesAsync();

        return Ok(usuario);
    }
    
    [HttpDelete("delUser/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();

        return Ok();
    }
    
}